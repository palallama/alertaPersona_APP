import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonicModule } from '@ionic/angular';
import { BotonGeneralComponent } from './boton/boton-general/boton-general.component';
import { FooterComponent } from './ui/footer/footer.component';
import { MapaComponent } from './ui/mapa/mapa.component';
import { TextInputComponent } from './input/text-input/text-input.component';
import { PasswordInputComponent } from './input/password-input/password-input.component';
import { SelectInputComponent } from './input/select-input/select-input.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ItemHistorialComponent } from './ui/item-historial/item-historial.component';
import { EstadoAlertasPipe } from '../pipes/estado-alertas.pipe';
import { AlertaComponent } from './alerta/alerta/alerta.component';
import { AlertaInputComponent } from './alerta/alerta-input/alerta-input.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleMapsModule,
    EstadoAlertasPipe,
  ],
  declarations: [
    FooterComponent,
    BotonGeneralComponent,
    TextInputComponent,
    PasswordInputComponent,
    SelectInputComponent,
    MapaComponent,
    ItemHistorialComponent,
    AlertaComponent,
    AlertaInputComponent,
  ],
  exports: [
    FooterComponent,
    BotonGeneralComponent,
    TextInputComponent,
    PasswordInputComponent,
    SelectInputComponent,
    MapaComponent,
    ItemHistorialComponent,
    AlertaComponent,
    AlertaInputComponent,
  ]
})
export class ComponenteModule { }
