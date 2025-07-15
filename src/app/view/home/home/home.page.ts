import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaService } from 'src/app/componente/alerta/alerta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  private router = inject(Router);
  private alerts = inject(AlertaService);

  asistirAlerta() {
    let alertaRandom:number = 11 + (Math.floor(Math.random() * 6));
    this.router.navigateByUrl('/asistir/'+alertaRandom)
  }

  async mostrarAlertaSimple() {
    await this.alerts.showAlert({
      title: 'Confirmación',
      message: '¿Estás seguro de realizar esta acción?',
      buttons: [
        { 
          text: 'Cancelar', 
          role: 'cancel',
          handler: () => {
            console.log('El usuario canceló');
            return true; // Cierra el alerta
          }
        },
        { 
          text: 'Aceptar', 
          role: 'confirm',
          handler: () => {  
            console.log('El usuario aceptó');
            return true; // Cierra el alerta
          }
        }
      ]
    });
  }
  async mostrarAlertaConInput() {
    const resultado = await this.alerts.showInputAlert({
      title: 'Confirmación requerida',
      message: 'Ingrese sus datos para continuar:',
      inputType: 'text',
      buttons: [
        { 
          text: 'Cancelar', 
          role: 'cancel' 
        },
        { 
          text: 'Enviar', 
          role: 'confirm',
          handler: (valor) => {
            if (!valor) {
              console.log('El campo no puede estar vacío');
              return false; // Evita que se cierre
            }
            return true; // Permite que se cierre
          }
        }
      ]
    });

    // Verificar el resultado
    if (resultado?.role === 'confirm') {
      console.log('Valor ingresado:', resultado.value);
      // Aquí puedes usar resultado.value
    } else {
      console.log('El usuario canceló la operación');
    }
  }

  showAlert() {
    // this.alerts.showAlert({
    //   title: 'ERROR',
    //   message: 'Ocurrió un error en el registro.\nPor favor, inténtelo nuevamente.',
    //   buttons: [{ text: 'OK' }],
    //   showCloseButton: true // Opcional
    // });
    this.alerts.showInputAlert({
      title: 'Ingrese datos',
      message: 'Por favor complete el campo',
      inputPlaceholder: 'Ej: contraseña',
      inputType: 'password',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { text: 'Aceptar', role: 'confirm' }
      ],
      showCloseButton: true
    });
    // this.alerts.showAlert({
    //   title: 'Confirmación',
    //   message: '¿Estás seguro de realizar esta acción?',
    //   buttons: [
    //     { text: 'Aceptar', role: 'confirm' }
    //   ],
    //   showCloseButton: true,
    //   backdropDismiss: true 
    // });
    // this.alerts.showInputAlert({
    //   title: 'ÚLTIMO PASO',
    //   message: 'Ingrese su contraseña para eliminar su cuenta.',
    //   inputPlaceholder: 'Contraseña',
    //   inputType: 'password',
    //   buttons: [
    //     { 
    //       text: 'Desactivar', 
    //       cssClass: 'danger-button',
    //       role: 'destructive'
    //     }
    //   ],
    //   cssClass: 'danger-alert',
    //   showCloseButton: false,
    //   backdropDismiss: false
    // });
  }
}
