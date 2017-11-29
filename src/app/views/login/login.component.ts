import { Component,ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth.service'
import {Router } from '@angular/router'
@Component({
  selector: 'app-login',
  template: '',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {

  constructor(private authService :AuthService,private router:Router ) {
    console.log('login init')
        console.log('authenticated ? - '+this.authService.isAuthenticated())
        if(this.authService.isAuthenticated()=== false){
          console.log('loging in')
          this.authService.login()
        }
      
     }
}
