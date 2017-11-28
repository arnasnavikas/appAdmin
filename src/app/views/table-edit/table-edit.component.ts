import { Component, OnInit, ViewEncapsulation,OnDestroy } from '@angular/core';
import { BackendService } from '../../backend.service'
import { ActivatedRoute } from '@angular/router'
import { MatTableDataSource } from '@angular/material';
import { FormControl} from '@angular/forms'
import { TableRow,TableStruct, TableHeader,serverResponse } from '../../intercafe.enum';
import { MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-table-edit',
  templateUrl: './table-edit.component.html',
  styleUrls: ['./table-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableEditComponent implements OnInit,OnDestroy {
  
  constructor(private backendService: BackendService,
    private router: ActivatedRoute,
    public snackBar: MatSnackBar) { }
  
    measure_type = [
      {
        name: 'Vienatas',
        measure: [
          { value: 'vnt', viewValue: 'VNT' }
        ]
      },
      {
        name: 'Plotas',
        measure: [
          { value: 'm2', viewValue: 'kv. metras' },
          { value: 'cm2', viewValue: 'kv. centimetras' }
        ]
      },
      {
        name: 'Tūris',
        measure: [
          { value: 'l', viewValue: 'litras' },
          { value: 'ml', viewValue: 'mililitras' }
        ]
      },
      {
        name: 'Ilgis',
        measure: [
          { value: 'm', viewValue: 'metras' },
          { value: 'cm', viewValue: 'centimetras' },
          { value: 'mm', viewValue: 'milimetras' }
        ]
      },
      {
        name: 'Svoris',
        measure: [
          { value: 't', viewValue: 'tona' },
          { value: 'kg', viewValue: 'kilogramas' },
          { value: 'g', viewValue: 'gramas' },
        ]
      }
    ];
  private group_id;
  private table : TableStruct
  load_table_data = ()=>{
    this.backendService.getTable(this.group_id)
    .subscribe((tableData:serverResponse)=>{
                   console.log(tableData)
                   this.table = tableData.table
                   this.backendService.table_rows =  tableData.tableRows
                 },
                   err=>{console.log(err)},
                 ()=>{})
  }
  ngOnInit() {
    this.backendService.item_type = 'table'
    this.router.params.subscribe(param=>{
      this.backendService.group_id = param.group_id
      this.group_id = param.group_id
      this.load_table_data()
    })
  }
  /************* SAVES TABLE DATA AUTOMATICLY WHEN COMPONENT IS DESTOYED *********** */
  ngOnDestroy(){
    this.backendService.saveTable(this.backendService.table_rows)
    .subscribe(data=>{console.log(data)},
               err=>{console.log(err)},
               ()=>{
                this.snackBar.open('lentelė išsaugota','', {
                  duration: 2000,
                  panelClass: 'blue-snackbar'
                });
               })
  }
}
