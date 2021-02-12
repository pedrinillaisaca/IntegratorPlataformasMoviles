import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { BackgroundMode } from '@ionic-native/background-mode/ngx';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Login',
      url: '/login',
      icon: 'mail'
    },
    {
      title: 'Registro',
      url: '/registro',
      icon: 'paper-plane'
    },
    {
      title: 'Favorites',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Archived',
      url: '/folder/Archived',
      icon: 'archive'
    },
    {
      title: 'Trash',
      url: '/folder/Trash',
      icon: 'trash'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private backgrundMode: BackgroundMode
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.backgrundMode.enable();//pinche metodo para los procesoso en segundo plan0
    });
      // ESTE CONJUNTO ESCUCHA AL BOTON DE RETROCESO
    // this.platform.backButton.subscribeWithPriority(10, () => {
    //   console.log('Handler called to force close!');
    //   navigator['app'].exitApp();
    // });
  }

  

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

}



// import { Component } from '@angular/core';

// import { Platform, AlertController } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';

// import { Location } from '@angular/common';

// @Component({
//   selector: 'app-root',
//   templateUrl: 'app.component.html',
//   styleUrls: ['app.component.scss']
// })
// export class AppComponent {
//   constructor(
//     private platform: Platform,
//     private splashScreen: SplashScreen,
//     private statusBar: StatusBar,

//     private _location: Location,
//     public alertController: AlertController
//   ) {
//     this.initializeApp();
//   }

//   initializeApp() {
//     this.platform.ready().then(() => {
//       this.statusBar.styleDefault();
//       this.splashScreen.hide();
//     });


//     this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
//       console.log('Back press handler!');
//       if (this._location.isCurrentPathEqualTo('/home')) {

//         // Show Exit Alert!
//         console.log('Show Exit Alert!');
//         this.showExitConfirm();
//         processNextHandler();
//       } else {

//         // Navigate to back page
//         console.log('Navigate to back page');
//         this._location.back();

//       }

//     });



//   }

//   showExitConfirm() {
//     this.alertController.create({
//       header: 'App termination',
//       message: 'Do you want to close the app?',
//       backdropDismiss: false,
//       buttons: [{
//         text: 'Stay',
//         role: 'cancel',
//         handler: () => {
//           console.log('Application exit prevented!');
//         }
//       }, {
//         text: 'Exit',
//         handler: () => {
//           navigator['app'].exitApp();
//         }
//       }]
//     })
//       .then(alert => {
//         alert.present();
//       });
//   }

// }

