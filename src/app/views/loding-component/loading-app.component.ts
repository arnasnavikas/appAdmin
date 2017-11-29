import { Component,ViewEncapsulation,OnChanges,OnInit } from '@angular/core';
import { AuthService } from '../../auth.service'
import { Router} from '@angular/router'
@Component({
  selector: 'app-loading',
  template: '<mat-spinner></mat-spinner>',
  encapsulation: ViewEncapsulation.None
})
export class AppLoadingComponent implements OnInit {

  constructor(private authService: AuthService,private router:Router,) {
  }
  ngOnInit(){
      console.log('loading init()')
      // console.log(this.router.url)
      if(this.authService.isAuthenticated() && this.router.url == '/loading'){
          console.log('navigating from loading')
          this.router.navigate(['/groups'])
      }
    }

}
