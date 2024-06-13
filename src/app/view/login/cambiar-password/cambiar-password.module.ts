import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CambiarPasswordPageRoutingModule } from './cambiar-password-routing.module';

import { CambiarPasswordPage } from './cambiar-password.page';
import { ComponenteModule } from 'src/app/componente/componente.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CambiarPasswordPageRoutingModule,
    ReactiveFormsModule,
    ComponenteModule
  ],
  declarations: [CambiarPasswordPage]
})
export class CambiarPasswordPageModule {}
