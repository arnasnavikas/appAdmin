import { Directive,Input, ElementRef,OnInit,HostListener,OnDestroy} from '@angular/core';
import { BackendService } from '../backend.service'
@Directive({
  selector: '[appAddItem]'
})
export class AddItemDirective implements OnInit,OnDestroy{
@Input() id;
  constructor(private backendService : BackendService) { }
ngOnInit(){
}
  @HostListener('click',['$event']) show(event){
    event.stopPropagation()
    this.backendService._addToList(this.id,event.target)
    console.log('this is add tolist directive')
  }
  ngOnDestroy(){
    this.backendService.addToList = false
    this.backendService.selected_DOM_items = []
    this.backendService.deleteList = []
  }
}
