import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistirPage } from './asistir.page';

const routes: Routes = [
  {
    path: '',
    component: AsistirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistirPageRoutingModule {}
