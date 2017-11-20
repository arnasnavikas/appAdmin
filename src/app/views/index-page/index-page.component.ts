import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-index-page',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./index-page.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class IndexPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
