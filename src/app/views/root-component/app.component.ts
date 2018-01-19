import { Component,OnInit} from '@angular/core';
import { AuthService } from '../../auth.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(private authService :AuthService,public router:Router) {
    this.authService.handleAuthentication()
  }  
}
