import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MsjConfirmPageRoutingModule } from './msj-confirm-routing.module';

import { MsjConfirmPage } from './msj-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MsjConfirmPageRoutingModule
  ],
  declarations: [MsjConfirmPage]
})
export class MsjConfirmPageModule {}
