import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendService } from '../../backend.service'
import { ActivatedRoute } from '@angular/router'
import { MatTableDataSource } from '@angular/material';
import { TableRow,TableStruct, TableHeader } from '../../intercafe.enum'
interface serverResponse {
  table : TableStruct,
  tableRows: TableRow[]
}
@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableEditComponent implements OnInit {

  constructor(private backendService: BackendService,
              private router: ActivatedRoute) { }
  private new_row = {group_id: '',
                      name:                  'string', 
                     price:                 0, 
                     type:                  'string', 
                     input:                 'string', 
                     iframeURL:             'string', 
                     iseiga:                5, 
                     hidden:                true,
                     material_price:        0, 
                     job_total_price:       0, 
                     material_total_price:  0, 
                     total_price:           0 }
  ELEMENT_DATA : TableRow[] = []
  displayedColumns = ['name','job_price','material_price','iseiga','iframe','options'];
  tableHead :TableHeader
  dataSource 
  group_id;
  private data_loaded 
  load_table_data = ()=>{
    this.data_loaded = false;
    this.backendService.getTable(this.group_id)
    .subscribe((tableData:serverResponse)=>{
                   console.log(tableData)
                   this.tableHead = tableData.table.head
                   this.ELEMENT_DATA = tableData.tableRows
                   this.dataSource = new MatTableDataSource<TableRow>(this.ELEMENT_DATA) ;
                   this.data_loaded = true
                 },
                   err=>{console.log(err)},
                 ()=>{})
  }
  ngOnInit() {
    
    this.router.params.subscribe(param=>{
      this.group_id = param.group_id
      this.new_row.group_id = this.group_id;
      this.load_table_data()
    })
  }
 addRow(){
   this.backendService.addTableRow(this.group_id)
                      .subscribe(row=>{
                        console.log(row);
                        this.ELEMENT_DATA.push(row)
                        this.dataSource = new MatTableDataSource<TableRow>(this.ELEMENT_DATA) ;
                      })
 }
 remove(row:TableRow){
   this.backendService.removeTableRow(row._id)
                      .subscribe(data=>{
                        console.log(data)
                        this.load_table_data();
                      });
 }
 save(){
   this.backendService.saveTable(this.ELEMENT_DATA)
                      .subscribe(data=>{console.log(data)},
                                 err=>{console.log(err)},
                                 ()=>{})
 }
}
