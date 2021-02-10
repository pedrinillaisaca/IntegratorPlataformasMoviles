import { Component, OnInit } from '@angular/core';
import { LoginInfo } from '../modelo/loginInf';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConfiguracionApp } from '../modelo/configApp';
import { ConfigAppServService } from '../services/config-app-serv.service';
import { NotificacionesService } from '../services/notificaciones.service';
import { AppLauncher, AppLauncherOptions } from '@ionic-native/app-launcher/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';


@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.page.html',
  styleUrls: ['./view-user.page.scss'],
})
export class ViewUserPage implements OnInit {
  interruptor:boolean=false;
  user:any;
  infoUser : LoginInfo;
  //configApp:ConfiguracionApp=new ConfiguracionApp();
  configApp:any;
  //configApp1:any;

  

  constructor(private route: ActivatedRoute,
     private router: Router,
     private authSvc:AuthService,
     public notificationsServ:NotificacionesService,
     private appLauncher: AppLauncher,
     private backgroud:BackgroundMode,  
     public configAppService:ConfigAppServService) {
    this.route.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.infoUser=this.router.getCurrentNavigation().extras.queryParams.infUser;
        this.user=this.router.getCurrentNavigation().extras.queryParams.userL;
        this.configApp=this.router.getCurrentNavigation().extras.queryParams.configParam;//configParam

        // this.configApp=configAppService.getConfigById(this.user.uid);
        // console.log(this.configApp);
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
    if(this.interruptor==true)
      this.runApp();

    
    
  }

  runApp(){      
    // this.backgroud.enable();               
    // this.backgroud.on("activate").subscribe(()=>{
    //   setInterval(this.runAppp,2000);
    //   this.backgroud.wakeUp();
    //   this.backgroud.unlock();            
    // });
    this.backgroud.enable();   
    this.backgroud.isScreenOff( ()=> {            
      this.backgroud.wakeUp();
      this.backgroud.unlock();
         
      let timerId=setInterval( () => this.runAppp(),5000);    
      
      });    
  }

  runAppp(){    
    
    console.log("PEDRO ILLAISACA");
    
    const options: AppLauncherOptions = {
    }    
    options.packageName = 'io.ionic.starter'
    //console.log("PEdro",options)
    this.appLauncher.canLaunch(options)//canLaunch(options)
      .then((canLaunch: boolean) => this.appLauncher.launch(options))
      .catch((error: any) => {this.notificationsServ.notificacionToasError("Error desconicido")}      
      ); 
    
  }


  
  
}
