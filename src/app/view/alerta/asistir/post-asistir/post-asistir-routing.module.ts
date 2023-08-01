import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostAsistirPage } from './post-asistir.page';

const routes: Routes = [
  {
    path: '',
    component: PostAsistirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostAsistirPageRoutingModule {}
