import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PostAsistirPageRoutingModule } from './post-asistir-routing.module';
import { PostAsistirPage } from './post-asistir.page';
import { GoogleMapsModule } from '@angular/google-maps'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostAsistirPageRoutingModule,
    GoogleMapsModule,
  ],
  declarations: [PostAsistirPage]
})
export class PostAsistirPageModule {}
