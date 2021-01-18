import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MsjConfirmPage } from './msj-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: MsjConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MsjConfirmPageRoutingModule {}
