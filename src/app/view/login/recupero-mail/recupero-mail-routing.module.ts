import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperoMailPage } from './recupero-mail.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperoMailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperoMailPageRoutingModule {}
