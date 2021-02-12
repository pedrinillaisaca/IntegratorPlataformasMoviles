import { Component, OnInit } from '@angular/core';
import { ParamApp } from '../modelo/param';
import { NotificacionesService } from '../services/notificaciones.service';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.page.html',
  styleUrls: ['./pregunta.page.scss'],
})
export class PreguntaPage implements OnInit {

  operacion:string;
  signo:string;
  op:number;  
  one:number;
  two:number;
  respuesta:number;
  //
  paramApp:ParamApp=new ParamApp();

  
  constructor(
    public notifSrv:NotificacionesService,
    private minizar:AppMinimize,
    private platform:Platform,
    private router:Router
    ) { 

    }


  aleatorio(min:number,max:number):number {
    var num:number = Math.floor(Math.random()*(max-min+1))+min;    
    return num;
    }

    
  ngOnInit() { 
    this.op=this.aleatorio(1,4);
    this.one=this.aleatorio(0,16);
    this.two=this.aleatorio(0,16);
    switch(this.op) { 
      case 1: { 
         this.signo=" + ";
         this.respuesta=this.one+this.two;
         break; 
      } 
      case 2: { 
        this.signo=" - ";
        this.respuesta=this.one-this.two;
        break; 
     } 
      case 3: { 
        this.signo=" x ";
        this.respuesta=this.one*this.two;
      break; 
      } 
      default: { 
        this.signo=" / ";
        this.respuesta=this.one/this.two;
         break; 
      } 
   } 
        
    this.operacion=""+this.one;
    this.operacion+=this.signo+this.two;

    //
    this.paramApp.res=this.aleatorio(1,20);
    this.paramApp.res1=this.aleatorio(1,20);
    this.paramApp.res2=this.aleatorio(1,22);
    this.paramApp.res3=this.aleatorio(1,25);

    this.op=this.aleatorio(1,4);
    switch(this.op) { 
      case 1: {          
         this.paramApp.res=this.respuesta;
         break; 
      } 
      case 2: { 
        this.paramApp.res1=this.respuesta;
        break; 
     } 
      case 3: { 
        this.paramApp.res2=this.respuesta;
      break; 
      } 
      default: { 
        this.paramApp.res3=this.respuesta;
         break; 
      } 
   } 
  }

  comprobar(mumerin:number){
    
    console.log("Numero: ",mumerin);
    if(mumerin==this.respuesta){      
      this.notifSrv.notificacionToast("Respuesta Correcta :)");      
      setTimeout( () => this.minizar.minimize(),2000);
    }else{
      this.notifSrv.notificacionToasError("Respuesta Incorrecta :(");
    }
    // this.platform.pause.subscribe((result)=>{        
    //   this.router.navigate(['/pregunta']);
    //   });
  }
  

}
