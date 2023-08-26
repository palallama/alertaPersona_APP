import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BotonGeneralComponent } from './boton/boton-general/boton-general.component';
import { FooterComponent } from './ui/footer/footer.component';
import { MapaComponent } from './ui/mapa/mapa.component';
import { TextInputComponent } from './input/text-input/text-input.component';
import { PasswordInputComponent } from './input/password-input/password-input.component';
import { SelectInputComponent } from './input/select-input/select-input.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ItemHistorialComponent } from './ui/item-historial/item-historial.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoogleMapsModule
  ],
  declarations: [
    FooterComponent,
    BotonGeneralComponent,
    TextInputComponent,
    PasswordInputComponent,
    SelectInputComponent,
    MapaComponent,
    ItemHistorialComponent,
  ],
  exports: [
    FooterComponent,
    BotonGeneralComponent,
    TextInputComponent,
    PasswordInputComponent,
    SelectInputComponent,
    MapaComponent,
    ItemHistorialComponent,
  ]
})
export class ComponenteModule { }
