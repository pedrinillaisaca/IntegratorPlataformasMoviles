import { Component, OnInit } from '@angular/core';
import { LoginInfo } from '../modelo/loginInf';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConfigAppServService } from '../services/config-app-serv.service';
import { NotificacionesService } from '../services/notificaciones.service';
import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Platform } from '@ionic/angular';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { ConfiguracionApp } from '../modelo/configApp';



@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.page.html',
  styleUrls: ['./view-user.page.scss'],
})
export class ViewUserPage implements OnInit {
  interruptor:boolean=false;
  user:any;
  infoUser : LoginInfo;
  configApp:ConfiguracionApp=new ConfiguracionApp();
  //configApp:any;
  //configApp1:any;
  interval:any;

  

  constructor(private route: ActivatedRoute,
     private router: Router,
     private authSvc:AuthService,
     public notificationsServ:NotificacionesService,
     private appLauncher: AppLauncher,
     private backgroud:BackgroundMode, 
     private platform:Platform, 
     private minimizar:AppMinimize,
     public configAppService:ConfigAppServService) {

    this.route.queryParams.subscribe(params=>{
      try {
        if(this.router.getCurrentNavigation().extras.queryParams){
        this.infoUser=this.router.getCurrentNavigation().extras.queryParams.infUser;
        this.user=this.router.getCurrentNavigation().extras.queryParams.userL;
        this.configApp=this.router.getCurrentNavigation().extras.queryParams.configParam;//configParam  
        console.log("CONFIG APP:",this.configApp);              
      }
      } catch (error) {
        console.log("Es mi primera vez");
      }
                  
    });
        
   }

  ngOnInit() {
    // this.configApp=this.configAppService.getConfigById1(this.user.uid);  
    // console.log('pedro'+this.configApp.email);
    
  }

  async logOut(){
    try {
      this.authSvc.logout();  
      this.router.navigate(["/login"]);
    } catch (error) {
      console.log('Error', error);
    }
  }   
  
  
  saveConfig(){
    this.configApp.userUid=this.user.uid;
    this.configAppService.guardarConfiguracion(this.configApp);
    this.notificationsServ.notificacionToast('Información Guardada.');
  }

  runService(){
    console.log(this.interruptor);
    if(this.interruptor==true){
      this.runApp();
      this.notificationsServ.notificacionToast("El Servicio ha sido habilitado.");
    }else{
      this.stopServ();
    }            
  }

  runApp(){      
    this.backgroud.enable();   
    this.backgroud.isScreenOff( ()=> {            
      this.backgroud.wakeUp();
      this.backgroud.unlock();
      this.runApp1();
      });    
  }

  runApp1(){  
    try {
      var text:string=this.configApp.tiempo;
    var num:number=+text.substr(0,2);
    console.log("Activate pedro",text.substr(2,4));//10min      
    if(text.substr(2,4)=='seg'){
        setTimeout( ()=>this.cerrar() , 3000);        
        this.interval=setInterval( () => this.runAppp(),(num*1000));    
      }else{//caso contrario formato minutos
        setTimeout( ()=> this.cerrar(), 3000);        
        this.interval=setInterval( () => this.runAppp(),(num*60000));    
      }    
      
    } catch (error) {
      console.log("ES mi primera Vez ");
    }
    
  }
  cerrar(){    
    console.log("Cerrando..");
    this.minimizar.minimize();
    this.platform.pause.subscribe((result)=>{        
      this.router.navigate(['/pregunta']);
      });
  }
  runAppp(){ 
    
    console.log("PEDRO ILLAISACA");         
    const options: AppLauncherOptions = {
    }         
    options.uri='io.ionic.starter://127.0.0.1:8100/prueba';//ESTA LINEA ES MUY IMPORTANTE !!!!!!!
    options.packageName = 'io.ionic.starter';
    //console.log("INFORMACIONS DE LAS OPCIONES ",options)
    this.appLauncher.canLaunch(options)//canLaunch(options)
      .then((canLaunch: boolean) => {
        this.appLauncher.launch(options);       
      })
      .catch((error: any) => {this.notificationsServ.notificacionToasError("Error desconicido")}      
      );           
  }
 

  
  stopServ() {
    clearInterval(this.interval);
    this.notificationsServ.notificacionToast("El Servicio ha sido desabilitado.");
  }
    
}
