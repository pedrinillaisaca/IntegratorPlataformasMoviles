import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewUserPageRoutingModule } from './view-user-routing.module';

import { ViewUserPage } from './view-user.page';
import { ComponentFotoComponent } from '../componentes/component-foto/component-foto.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewUserPageRoutingModule
  ],
  declarations: [ViewUserPage,ComponentFotoComponent]
})
export class ViewUserPageModule {}
