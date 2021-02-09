import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { __param } from 'tslib';
import { LoginInfo } from '../modelo/loginInf';
import { AuthService } from '../services/auth.service';
// import { User } from '../shared/user.interface';
import { NotificacionesService } from '../services/notificaciones.service';


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
    public notificationsServ:NotificacionesService
    ) { }

  ngOnInit() {
  }

  async login(){
    console.log(this.loginInfo);    
    const user = await this.authSvc.login(this.loginInfo.correo,this.loginInfo.contrasenia);
    if (user) {
      const verificacion=this.authSvc.isEmailVerified(user);
      this.redireccionar(verificacion);      
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

  private redireccionar (isVerified: boolean): void{

    let params: NavigationExtras={
      queryParams:{
        infUser: this.loginInfo
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
