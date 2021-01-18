import { Component, OnInit } from '@angular/core';
import { LoginInfo } from '../modelo/loginInf';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  loginInfo:LoginInfo=new LoginInfo();//clase que contienen las credenciales del usuario

  constructor(private authSvc:AuthService,private router:Router) { }

  ngOnInit() {
  }
  async enviar(){
    try {
      const user = await this.authSvc.register(this.loginInfo.correo,this.loginInfo.contrasenia);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        this.redireccionar(isVerified);
        console.log("User->",user)

        //this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error', error);
    }
  }    
  
  
  private redireccionar (isVerified: boolean): void{
    if(isVerified){
      console.log("VErificado")
      this.router.navigate(["/view-user"]);//NO SE VA A USAR
    }else{
      this.router.navigate(["/msj-confirm"]);
    }
  }
}
