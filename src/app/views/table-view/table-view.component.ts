import { Component, OnInit, ViewEncapsulation,ViewChild,ViewChildren,AfterViewInit, ElementRef} from '@angular/core';
import { BackendService } from '../../backend.service'
import { ActivatedRoute } from "@angular/router"
import { TableRow,TableStruct} from '../../intercafe.enum'
import { Observable         } from 'rxjs';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableViewComponent implements OnInit,AfterViewInit {
@ViewChild('search') search_input : ElementRef
@ViewChildren('rowName') row_name // dom element reference
  constructor(private backendService : BackendService,
              private router: ActivatedRoute) { }
 private rows : TableRow[] = []
 private constRows : TableRow[]
  ngOnInit() {
    this.router.params.subscribe(params=>{
      this.backendService.getTable(params.group_id)
                         .subscribe((tableRows:TableRow[])=>{
                          this.constRows = tableRows
                          this.rows =tableRows
                         })
    })
    console.log('this is table view component init()')
  }
  ngAfterViewInit(){
    /****************************** FILTER ROWS BY NAME FROM INUT ****************************** */
    Observable.fromEvent(this.search_input.nativeElement,"keydown")
                          .debounceTime(300)
                          .map((input:any)=>{return input.target.value.trim().toLowerCase().replace(/\W/gi,'')})
                          .subscribe(search_word=>{
                            console.log('keyword replaced '+search_word)
                            let expr = new RegExp(search_word,'gi')
                            let localRow = this.constRows.filter(function(row){ 
                              return row.name.toLowerCase().includes(search_word) == true;
                            })
                            this.rows = localRow
                          });
    /****************************** HIGHLIGHT MATCHED SEARCH VALUE  ****************************** */
    Observable.fromEvent(this.search_input.nativeElement,"input")
                          .debounceTime(400)
                          .map((input:any)=>{return input.target.value.trim().toLowerCase().replace(/\W/gi,'')})
                          .subscribe(search_word=>{
                            let expr = new RegExp(search_word,'gi')
                            if(this.rows.length >0){
                                 for(let span_el of this.row_name._results){
                                   let row_name = span_el.nativeElement.innerText
                                   let highlight= row_name.match(expr) // <= finds all parts of matched text and return it in array
                                   if(highlight){
                                     for(let i of highlight){
                                       span_el.nativeElement.innerHTML =row_name.replace(i,'<span style="background: yellow">'+i+'</span>')
                                     }
                                   }
                                 }
                               }
                          })
                            
  }
  
  /** ********* LIMITS INPUT UP TO 5 NUMBER ************* */
  limitValue(row:TableRow,type){
    
    switch (type) {
      case 'input':
      if(row.input && row.input.toString().length > 5){
        row.input = Number(row.input.toString().slice(0,-1))
        console.log('input changed')
        return
      }
        break;
      case 'iseiga':
      if(row.iseiga && row.iseiga.toString().length > 5){
        row.iseiga = Number(row.iseiga.toString().slice(0,-1))
        console.log('value changed')
        return
      }
        break;
      case 'material_price':
      if(row.material_price && row.material_price.toString().length > 5){
        row.material_price = Number(row.material_price.toString().slice(0,-1))
        console.log('value changed')
        return
      }
        break;
    
      default:
      console.log('error from limitValue() function')
        break;
    }
    

  }

}
