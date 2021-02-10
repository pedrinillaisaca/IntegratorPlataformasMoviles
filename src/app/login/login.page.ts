import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { __param } from 'tslib';
import { LoginInfo } from '../modelo/loginInf';
import { AuthService } from '../services/auth.service';

import { NotificacionesService } from '../services/notificaciones.service';
import { ConfigAppServService } from '../services/config-app-serv.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginInfo:LoginInfo=new LoginInfo();//clase que contienen las credenciales del usuario

   
  
  
  constructor(
    private authSvc: AuthService,
    private router:Router,
    public notificationsServ:NotificacionesService,
    public configAppServ:ConfigAppServService
    ) { }

  ngOnInit() {
  }

  async login(){
    console.log(this.loginInfo);    
    const user = await this.authSvc.login(this.loginInfo.correo,this.loginInfo.contrasenia);
    
    if (user) {
      const verificacion=this.authSvc.isEmailVerified(user);
      
      this.redireccionar(verificacion,user);      
      console.log("Usuario-> "+user)        
      //this.redirectUser(isVerified);
    }
    
  }     

  
  async onLogConGoogle(){
    // try {
    //   const user = await this.authSvc.loginGoogle();
    //   if(user){

    //   }
    // } catch (error) {console.log("Error -> ",error)}
  }

  async  redireccionar (isVerified: boolean,user:any){        
    const configApp= await this.configAppServ.getConfigById(user.uid);
    
    let params: NavigationExtras={
      queryParams:{
        infUser: this.loginInfo,
        userL: user,
        configParam:configApp
      }
    }
    if(isVerified){
      console.log("VErificado")
      this.router.navigate(["/view-user"],params);
    }else{
      this.notificationsServ.notificacionToast("Porfavor verifique su cuenta");
    }
  }

}
