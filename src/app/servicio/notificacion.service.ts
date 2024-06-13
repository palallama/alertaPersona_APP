import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { StorageService } from './storage.service';
import { StorageKeys } from '../interfaz/storage';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class NotificacionService {
  private route = inject(Router);
  private http = inject(HttpClient);
  private storageService = inject(StorageService);


  async iniciarNotificaciones() {
    if (Capacitor.getPlatform() !== "web"){
      await this.registerPush();
    }
  }

  private async registerPush() {

    try {
      await this.addListeners();

      
      let permisoNotificacion = await PushNotifications.checkPermissions();
      // console.log(permisoNotificacion.receive)
      
      permisoNotificacion = await PushNotifications.requestPermissions();
      // console.log(permisoNotificacion.receive)

      if (permisoNotificacion.receive === 'prompt') {
        permisoNotificacion = await PushNotifications.requestPermissions();
      }
      if (permisoNotificacion.receive !== 'granted'){
        throw new Error("Permisos de notificacion desactivados");
      }

      console.log("notificacion token: ", await this.storageService.get(StorageKeys.TOKEN_NOTIFICACION));

      if ((await this.storageService.get(StorageKeys.TOKEN_NOTIFICACION)) === null){
        await PushNotifications.register();
      }
    } catch (error) {
      console.log(error);
    }


  }

  private async addListeners() {
    await PushNotifications.addListener('registration', token => {
      // console.log('Registration token: ', token.value);
      this.storageService.set(StorageKeys.TOKEN_NOTIFICACION, token.value);
      // alert("Push registration success, token: " +token.value);
    });
  
    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
      alert('Registration error: ' + JSON.stringify(err));
    });
  
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
      alert('Registration error: ' + JSON.stringify(notification));
    });
  
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('*****Push notification action performed');
      console.log(notification);
      // alert('Registration error: ' + JSON.stringify(notification));

      if (notification.notification.data.motivo === 'A'){
        this.route.navigateByUrl('/asistir/' +notification.notification.data.alerta);
      }

    });
  }

  private urlBase64ToUint8Array(base64String:any) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  private async registrarPropio(){
    const PUBLIC_VAPID_KEY = "BP4T2BYRmC6D6Y1a7kvp-DpwIHXXOr1Bly3up35UGGW4b9CrVbn1AXg2AqDt3-eDcypWUHzbkrz0csAVtzykUmM";
    // Service Worker
    console.log("Registering a Service worker");
    const register = await navigator.serviceWorker.register("./worker.js", {
      scope: "/frontend/"
    });
    console.log("New Service Worker");

    // Listen Push Notifications
    console.log("Listening Push Notifications");
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: this.urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
    });

    this.http.post(`http://localhost:4800/new-message`, JSON.stringify(subscription) ).pipe(tap( (res:any) => {console.log(res)})).subscribe({
      next: (res:any) => {
        console.log(res);
      },
      error: (err:any) => {
        console.log(err);
      }
    })

  }


}
