import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperoMailPageRoutingModule } from './recupero-mail-routing.module';

import { RecuperoMailPage } from './recupero-mail.page';
import { ComponenteModule } from 'src/app/componente/componente.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RecuperoMailPageRoutingModule,
    ComponenteModule
  ],
  declarations: [RecuperoMailPage]
})
export class RecuperoMailPageModule {}
