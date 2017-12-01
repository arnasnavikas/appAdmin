import { Directive,Input, ElementRef,OnInit,HostListener,OnDestroy} from '@angular/core';
import { BackendService } from '../backend.service'
@Directive({
  selector: '[appAddItem]'
})
export class AddItemDirective {
@Input() id;
  constructor(private backendService : BackendService) { }

  @HostListener('click',['$event']) show(event){
    event.stopPropagation()
    this.backendService._addToList(this.id,event.target)
    console.log('this is add tolist directive')
    console.log(this.backendService.selected_items)
  } 
}
