import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/user.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-msj-confirm',
  templateUrl: './msj-confirm.page.html',
  styleUrls: ['./msj-confirm.page.scss'],
})
export class MsjConfirmPage  {

  user$: Observable<User> =this.authSvc.afAuth.user;

  constructor(private authSvc:AuthService) { }

  async onSendEmail(): Promise<void> {
    try {
      await this.authSvc.sendVerifcationEmail();
    } catch (error) {
      console.log('Error->', error);
    }
  }
  ngOnDestroy(): void {
    this.authSvc.logout();
  }
}
