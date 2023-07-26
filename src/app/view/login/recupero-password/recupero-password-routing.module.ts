import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperoPasswordPage } from './recupero-password.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperoPasswordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperoPasswordPageRoutingModule {}
