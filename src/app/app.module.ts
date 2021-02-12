import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
// procesos en segundo plano
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { AppLauncher } from '@ionic-native/app-launcher/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';




@NgModule({
   declarations: [AppComponent],
   entryComponents: [],
   imports: [
     BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     AngularFireModule.initializeApp(environment.firebaseConfig),
     AngularFireAuthModule,
    //  AgmCoreModule.forRoot({
    //   apiKey: ''
    // })
   ],
   providers: [
     StatusBar,
     SplashScreen,
     BackgroundMode,
     AppLauncher,
     AppMinimize,
     { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
   ],
   bootstrap: [AppComponent]
 })
 export class AppModule {}