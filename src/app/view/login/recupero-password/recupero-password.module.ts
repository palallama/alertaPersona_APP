import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperoPasswordPageRoutingModule } from './recupero-password-routing.module';

import { RecuperoPasswordPage } from './recupero-password.page';
import { ComponenteModule } from 'src/app/componente/componente.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RecuperoPasswordPageRoutingModule,
    ComponenteModule
  ],
  declarations: [RecuperoPasswordPage]
})
export class RecuperoPasswordPageModule {}
