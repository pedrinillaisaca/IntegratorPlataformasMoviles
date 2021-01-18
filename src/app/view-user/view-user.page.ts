import { Component, OnInit } from '@angular/core';
import { LoginInfo } from '../modelo/loginInf';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ConfiguracionApp } from '../modelo/configApp';
import { ConfigAppServService } from '../services/config-app-serv.service';





@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.page.html',
  styleUrls: ['./view-user.page.scss'],
})
export class ViewUserPage implements OnInit {

  infoUser : LoginInfo;
  configApp:ConfiguracionApp=new ConfiguracionApp();

  constructor(private route: ActivatedRoute,
     private router: Router,
     private authSvc:AuthService,
     public configAppService:ConfigAppServService) {
    this.route.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.queryParams){
        this.infoUser=this.router.getCurrentNavigation().extras.queryParams.infUser;
      }
      
    });

   }

  ngOnInit() {
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
    this.configAppService.guardarConfiguracion(this.configApp);
  }
  
}
