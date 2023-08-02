import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostEmitirPage } from './post-emitir.page';

const routes: Routes = [
  {
    path: '',
    component: PostEmitirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostEmitirPageRoutingModule {}
