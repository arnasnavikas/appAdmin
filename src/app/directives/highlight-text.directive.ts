import { Directive,Input, ElementRef,OnInit,HostListener} from '@angular/core';
import {TableRow} from '../intercafe.enum'
import { Observable } from 'rxjs'
import { BackendService } from '../backend.service'
@Directive({
  selector: '[highlight]'
})
export class HighLightTextDirective implements OnInit{
  @Input() getClass; 
  @Input() rows : TableRow[]
    constructor(private ElRef: ElementRef,private backendService:BackendService) { }
ngOnInit(){
    Observable.fromEvent(this.ElRef.nativeElement,'input')
    .debounceTime(200)
    .map((event:any)=>{return event.target.value})
    .subscribe(search_value=>{
        for(let row of this.backendService.table_rows){
            row.search_name = row.name
        }
        console.log('from deirective')
        console.log(search_value)
        let regex = new RegExp(search_value,'gi')
        let dom = document.getElementsByClassName(this.getClass)
        console.log(dom)
              
                for(let x=0; x < dom.length;x++){
                    let row_name = dom[x].innerHTML
                    let highlight= row_name.match(regex)
                    //   console.log(highlight)
                    if(highlight){
        
                        for(let i of highlight){
                            //   console.log('dom '+dom[x])
                            //   console.log('replace value - '+i)
                            dom[x].innerHTML =row_name.replace(i,'<span style="background: yellow">'+i+'</span>')
                          }
                      }
                  }
    })
}
}
