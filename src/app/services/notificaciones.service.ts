import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {

  constructor(public toastController: ToastController,
    public alertController: AlertController) { }


  async notificacionToast(text: string){
    console.log("Llamada a las notificaciones:")
    const toast = await this.toastController.create({
      message: text,
      duration: 5000
    });
    toast.present();
  }

  async notificacionToasError(text: string){
    console.log("Llamada a las notificaciones:")
    const toast = await this.toastController.create({
      message: '<strong>'+text+'</strong>',
      duration: 2000,
      position:"bottom",
      color:"danger"
    });
    toast.present();
  }
  async confirmacion(header: string, message: string, funcion?) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: header,
      message: message,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Aceptar',
          role: 'ok',
          handler: () => {
            funcion();
          }
        }
      ]
    });

    await alert.present();
  }
}
