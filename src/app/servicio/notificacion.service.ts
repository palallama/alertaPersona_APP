import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {
  private route = inject(Router);


  iniciarNotificaciones() {
    if (Capacitor.getPlatform() !== "web"){
      this.registerPush();
    }
  }

  private async registerPush() {

    try {
      await this.addListeners();
      let permisoNotificacion = await PushNotifications.checkPermissions();

      if (permisoNotificacion.receive === 'prompt') {
        permisoNotificacion = await PushNotifications.requestPermissions();
      }
      if (permisoNotificacion.receive !== 'granted'){
        throw new Error("Permisos de notificacion desactivados");
      }

      await PushNotifications.register();
    } catch (error) {
      console.log(error);
    }


  }

  private async addListeners() {
    await PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value);
      // alert("Push registration success, token: " +token.value);
    });
  
    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
      // alert('Registration error: ' + JSON.stringify(err));
    });
  
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
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
