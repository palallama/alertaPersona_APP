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

@Injectable({
  providedIn: 'root'
})

export class NotificacionService {
  private route = inject(Router);
  private storageService = inject(StorageService);


  iniciarNotificaciones() {
    if (Capacitor.getPlatform() !== "web"){
      this.registerPush();
    }
  }

  private async registerPush() {

    try {
      await this.addListeners();

      
      let permisoNotificacion = await PushNotifications.checkPermissions();
      console.log(permisoNotificacion.receive)
      
      permisoNotificacion = await PushNotifications.requestPermissions();
      console.log(permisoNotificacion.receive)

      if (permisoNotificacion.receive === 'prompt') {
        permisoNotificacion = await PushNotifications.requestPermissions();
      }
      if (permisoNotificacion.receive !== 'granted'){
        throw new Error("Permisos de notificacion desactivados");
      }

      console.log("notificacion token: ", await this.storageService.get(StorageKeys.TOKEN_NOTIFICACION));
      console.log("notificacion token: ", (await this.storageService.get(StorageKeys.TOKEN_NOTIFICACION)) === null);

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
      // console.error('Registration error: ', err.error);
      // alert('Registration error: ' + JSON.stringify(err));
    });
  
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      // console.log('Push notification received: ', notification);
      // alert('Registration error: ' + JSON.stringify(notification));
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


}
