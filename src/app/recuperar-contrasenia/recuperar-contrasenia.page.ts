import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginInfo } from '../modelo/loginInf';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-recuperar-contrasenia',
  templateUrl: './recuperar-contrasenia.page.html',
  styleUrls: ['./recuperar-contrasenia.page.scss'],
})
export class RecuperarContraseniaPage implements OnInit {

  loginInfo:LoginInfo=new LoginInfo();//clase que contienen las credenciales del usuario
  
  constructor(private authSvc:AuthService,private router:Router) { }

  ngOnInit() {
  }

  async recuva(){
    try {
      try {
        await this.authSvc.resetPassword(this.loginInfo.correo);
        this.router.navigate(["/login"]);
      } catch (error) {
        
      }
    } catch (error) {
      console.log('Error', error);
    }
  } 

}
