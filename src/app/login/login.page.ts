import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { __param } from 'tslib';
import { LoginInfo } from '../modelo/loginInf';
import { AuthService } from '../services/auth.service';

import { NotificacionesService } from '../services/notificaciones.service';
import { ConfigAppServService } from '../services/config-app-serv.service';
import { ConfiguracionApp } from '../modelo/configApp';




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
    public configAppServ:ConfigAppServService,
    public configAppService:ConfigAppServService

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
  

    
async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        
        let configApp:ConfiguracionApp=new ConfiguracionApp();
        configApp.tiempo="10seg";
        configApp.param="elegir";
        configApp.param1="elegir";
        configApp.param2="elegir";  
        // configApp.img="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAclBMVEUAAAD////7+/vw8PAODg6cnJza2trk5OQ8PDzOzs5hYWGPj4+vr68TExN/f3/39/e8vLxtbW3CwsKlpaVERESgoKDs7OzMzMyVlZUlJSVPT0+Li4svLy+Dg4Pi4uJycnIbGxtcXFw+Pj5ISEizs7NUVFRbCTSeAAAKdElEQVR4nM2d65aaMBSFoyCCIqKOijqd0Tp9/1fsIKJA7slOyPejq12rC7IFkpNzC5k455CVu6rY3O7paRUTEq9O6f22KapdmR3c3504vHaU5cWZSDgXeRY5HIQjgdNstpBJ67KYZVM3I3Eh8HhJdcS1pJejg8GgBc73dxNxLff9HDwgqMBkubJR17BaJsgx4QTOq9heXUNc4Z4jSmBu9NnxSXPQwCACvwqsuobiCzE2gMDthwt5NR/bAATmgHmFz8r6TbUUuHOprmE3okAP8qwlWgj88SOv5mcEgdmnP32EfGaeBUZapjSCheGWw0zgzLe8mpk3gclpDH2EnEyMVAOBf8aRV/PHg8AEZlKbEGs/RF2ByzHl1SydCozAewYTUr3pVEvgdmxxDVomuI7AEWeXPjpzjbrAqbNdkT4f6i44ZYFfY4vqo7wZVhUYyOf3RvVDVBS4H1sPzR4p0InPxZYCJ9D71kGNBUqgNIAyFmeMwICWhyEfCIEBWGd8UnuBQetTUCgTGPD72SB7SyUCg51f3khmGrHAQNeHPuLVQigwyPWdRrjiiwQGaJ+xEVltAoHB2dd8BJY3X2Bg+yMx/N0TV+B07DHrwd0BcwUGvwD24S6HPIHB+F9U4flpOALhE0y8mW2Tw+NFmh6S7WwD9x9zJhq2wAh77++S4cuMym/sXdj+UrZApIW9ECRoHZGmEtvuZgoE+uerNV9ezbrC3Yvp1WcJTGC3rMTqGnASWZEZlkDU9/+t6J6doj7GWE0gaIW4akS6kivmnoy1ghYIekHVnHovQBsX+kelBWLi06WevsmkhNz2JBeIyS8wSIecQ25MZSoMBUKW+JNkbWCzhrw7w+V+KBCx8n6ayKtB5BYNHRgDgRngFvR3oAziGQ5yogYCEb+h0fvZsAbcfvD+9AUi8uus0q0RM00/c68vEHB57fWhD2K14AsE5H9qru80gBW/l1/aE2h/7autvsnkaj8KnkDAAwTUdABMxe4j7Aq0v/K3vb7JBLC3YAvM7S8MqSADOCw7ufodgfb1AUr7Wzn2O+AVSyDAkYbRh/hW3i6296DsPb2gB4h4hG8/8EsgIBRhYaP1AVhsr2DFS6D9AquUtqKG/Z7mZXC8BFpfkgALVI/2oxkKBKwROH2In7tdKdph2fuyIYt8i/1i3/q5nwIB2xTLbUQfwKZi3hMI8C5Dq/0BrqGqJ9Demc3yKlsAG1AjEGDBb7ACN/YjSjoCAeEks9IpLgD37LIjEFCHC6gn7gKwjFdvgQhXD7R9ASZCMn8JRKQ0gVvDHABD2r8EWvXXeALuloJI07m/BAIuBm/bghpT/QfAtA1T4PEp8IK4WIgCL0+BkKSREAWmjUBM2l2Ak8xjUAQTMgtymXiE0ggqaB3gQv+wHwkq8zw8U4083EQE8zmHaGzX1AJBmYXhbZdqol+BmDkmvA3vg+xXIMCf9iA0l8WD/FcgqvojNKfTg+JXIKo8KTC3YcP5VyDoUqE5fttBAQWG5bp/MiEYm6gmqOBLy4GAVomakMJnLRlBzVckqADoi5Igm7+hBAKHtCPAXyucJITOkAi0yjOUNJI3BQFZtQ2hJAK92ZAb8nKBpHJ1uBGE0/dNGMl4He4E3OkghHTKLilBt/ELICG2y4nAO9iOntLcY0XwnfxGTkrv46JR4chlBR4YtTCEwskzHLG0Z0CMn2QejFacNWQFXyaejFReR3FCL/QvximQpEjBplqHMUpcae5gY7uH9yJlBjfsdmmI5zJzBhvshpfGZ6MAFgXUZcHEW6sHJhXU6cTDT7MOJjuk21CE+3YrbEqk4zdEMqDrPkgOwOBLkCCjS0ECDIAGyRkYwg6SApiEECQ5Lo0kTDJcIlCYRLhUrjABJuMFyQKYThkkM2BCrIjPxWW3TebRc4c/jebJdndZuD97KwOmNHO4L0uBC3FeLp35hGqmwKR0BveZkt8pmbkS+UxKx5QVDNmUGgH7aenENdSWFeASp1puBlHCEu/fawtD0CvhzDB1NELP55NWIPIb+GuVnb79CxzKuzgL1zH8bJ1mkeC2b+/yOlRg5w4pnkhQL9S7QBJR4krICZYweoSEvDolrpCet6iznR8gNqndImX77KINujjLfmHslplblykA05lbbFfnXqMAywgPuOqlxe4h9ls9WM2j0IqJLlZhhX6zDguD+xNa8tInMt9RDdqtmE9bjl7PFuPXdNgwx9QetTxrXI5peO+lq/2Lmf/Xwew5xGw2pZtWGbUdUz7H0Qa7kVk1jgMXJvMwiPAxGsfpV83GsEoXGWttO4TV+k/X4vanT18hs3mj7krhUZ92piy7/abeSuHp+2vR+w67ojp/11lyvMyfXXTmUl4LXI1H6GH9G6KxHvY0df+h/Aid2y8szEZn1Ejcsf3JQ9Uu7Uvq/UutFbxx0rktansLUSt4tUs43B+JUQpGC5v5K4XSnO1v5ajsgMXHMSiEe0f6ABvkn6HkQA2Ft8CXFjbS4cmORJEGtEdYAbvIVkPpoTay+qFRX9Aa8UuqcCyRxAkM9u/qIw64qxwsJTwaDOqfN0O06VE6Gkzk5raonMPB/4YUD3cTvKQjzzAN/HlG9Xg+brDp7njoivDih8oHLHL93ODmcKZw3jCNIzI5y73kYHR/sKPcOoecsl1sgTxAziPUOqaWuVb8dTZgbRi5GJoHDbP8wODuhTbQL5j2UdG0xQBoU4HjOhyd/mHflBvrOto+lyYaCjQ4rp3xHnh2hfKhnKSCr0e0vaMSoLw7Q9lQLtK94D8L969UzDBMU01Y8C3eoFMOjB/hf/cC5fkTN6yTeCAom+ECHKoRVPauxL6SuVio5fAGGqghVNYsdwF8IvUhUXb3dcTJ9HAdjoZtYXeQO8noncVoJg1twEj1KQhkGG3WnanMoBNBZO/nREkgY3dyGuE1PdCuCpX9m5Ifl+Hu9h5AYwTPlBqaqjmqGVlCH15N04iR5KL2oSh64llp6yIDCYzF7VVDDawt/qenLX7CCuqpTuXKsRRmEsDGQy7JmumsV7b71YNFU2auF7iHPw0zGPShHkHQiYaxffpOvflsPz3P/8JCK9zHTmeLnW0xfthBBC1LSi+eGbE9wrGTp5iz5aV665NuwJbn1Ze1NtKF2wqJ6Z8XoB2RTnixpw1w0Uh4Yc5Y+yYGIXdu/PC0gzzG9Y4bINOZXZ6Y5BQk/AidSelnH0Eh6MnkHTFLmhBlKtx+jK3U6EdU5mq25BpmhUTCfJq0yuSXGJJVwuKUheHPZpz2kkmyvs7VUfmLXB8rSd3np8Ev1mCR1yPP3Kt7jUk6jc6VOpBZmBJWiUtqGZzxv6LKt9nXYd22elgfvrJtXhX/1HLNrTbXlplZHvrqWfoOrFPPcjc9dJ+srI1AQG7d1qBmRo0PgIMSkjz45aSzVwEJZqGyI3NwS5MUtUHBpX/OK1jDybiyapjfA5rfmiwBM85qCfVloRN453urRg33Pe7ZNbjIUD5ejD7I9OIigOwoBXuazbS6mS1mmaNUW5c55lGWF9LmKeciz1xGATwk0R+yclcVm9s9Pa1+J9p4dUrvt01R7crMQ5DqP2XZmYvjGTHrAAAAAElFTkSuQmCC";              
        configApp.userUid=user.uid;
        this.configAppService.guardarConfiguracion(configApp);

        this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error->', error);
    }
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

  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['/recuperar-contrasenia']);
    } else {
      
    }
  }

}
