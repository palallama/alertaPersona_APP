import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistirPageRoutingModule } from './asistir-routing.module';

import { AsistirPage } from './asistir.page';
import { ComponenteModule } from 'src/app/componente/componente.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistirPageRoutingModule,
    ComponenteModule,
    HttpClientModule
  ],
  declarations: [AsistirPage]
})
export class AsistirPageModule {}
