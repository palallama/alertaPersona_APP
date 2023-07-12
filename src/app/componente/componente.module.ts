import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BotonGeneralComponent } from './boton/boton-general/boton-general.component';
import { FooterComponent } from './ui/footer/footer.component';
import { TextInputComponent } from './input/text-input/text-input.component';
import { PasswordInputComponent } from './input/password-input/password-input.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

  ],
  declarations: [
    FooterComponent,
    BotonGeneralComponent,
    TextInputComponent,
    PasswordInputComponent,
  ],
  exports: [
    FooterComponent,
    BotonGeneralComponent,
    TextInputComponent,
    PasswordInputComponent,
  ]
})
export class ComponenteModule { }
