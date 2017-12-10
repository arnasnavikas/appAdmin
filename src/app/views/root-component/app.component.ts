import { Component,OnInit} from '@angular/core';
import { AuthService } from '../../auth.service'
import { Router } from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService :AuthService,public router:Router) {
    console.log('app init()')
      if(!this.authService.isAuthenticated()){
        this.authService.handleAuthentication()
      }else
        this.router.navigate(['/admin/select-user'])
   }
  
}
