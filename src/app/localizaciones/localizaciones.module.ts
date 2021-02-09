import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocalizacionesPageRoutingModule } from './localizaciones-routing.module';

import { LocalizacionesPage } from './localizaciones.page';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalizacionesPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  declarations: [LocalizacionesPage]
})
export class LocalizacionesPageModule {}
