import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendService } from '../../backend.service'
import { ActivatedRoute } from "@angular/router"
import { TableRow,TableStruct} from '../../intercafe.enum'
interface serverResponse {
  table : TableStruct,
  tableRows: TableRow[]
}
@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableViewComponent implements OnInit {

  constructor(private backendService : BackendService,
              private router: ActivatedRoute) { }
private rows : TableRow[]
  ngOnInit() {
    this.router.params.subscribe(params=>{
      this.backendService.getTable(params.group_id)
                         .subscribe((table:serverResponse)=>{
                          this.rows = table.tableRows
                          console.log(this.rows)
                         })
      
    })
    console.log('this is table view component init()')
  }

}
