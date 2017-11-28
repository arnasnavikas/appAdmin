import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../auth.service'
import {Router } from '@angular/router'
@Component({
  selector: 'app-login',
  template: '<router-outlet><router-outlet>',
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  constructor(private authService :AuthService,private router:Router ) {
    if(!this.authService.isAuthenticated())
       this.authService.login()
     }

  ngOnInit() {
  }

}
