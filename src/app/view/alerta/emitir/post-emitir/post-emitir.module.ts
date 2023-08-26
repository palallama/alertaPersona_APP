import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostEmitirPageRoutingModule } from './post-emitir-routing.module';

import { PostEmitirPage } from './post-emitir.page';
import { ComponenteModule } from 'src/app/componente/componente.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostEmitirPageRoutingModule,
    ComponenteModule,
  ],
  declarations: [PostEmitirPage]
})
export class PostEmitirPageModule {}
