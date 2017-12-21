import { Component, OnInit,ViewChild,ViewEncapsulation} from '@angular/core';
import { BackendService } from '../../backend.service'
import { ActivatedRoute } from '@angular/router'
import { MessagesInterface} from '../../intercafe.enum'
import { MatTableDataSource,MatPaginator} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
@Component({
  selector: 'app-user-mail',
  templateUrl: './user-mail.component.html',
  styleUrls: ['./user-mail.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UserMailComponent implements OnInit,OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private backendService: BackendService,private _router: ActivatedRoute) { }
  displayedColumns = ['select','info','email', 'message','status'];
  mailOption = [
    {viewValue:'Naujas',value:0},
    {viewValue:'Žiurėtas',value:1},
    {viewValue:'Atsakytas',value:2},
    {viewValue:'Visas',value:3},
  ]
  dataSource
  selection = new SelectionModel<Element>(true, []);
  getMail(val){
    this.backendService.selected_items = []
    this.selection.clear()
    switch (val) {
      case 0:
        this.backendService.getNewMessages().subscribe(messages=>{
          this.makeTable(messages);
        })
        break;
      case 1:
        this.backendService.getReadedMessages().subscribe(messages=>{
          this.makeTable(messages);
        })
        break;
      case 2:
        this.backendService.getReplayedMessages().subscribe(messages=>{
          this.makeTable(messages);
        })
        break;
      case 3:
        this.backendService.getAllMessages().subscribe(messages=>{
          this.makeTable(messages);
        })
        break;
    
      default:
        break;
    }
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.selection)
  }

  ngOnInit() {
    this.backendService.item_type = 'user-mail'
    this.backendService.getNewMessages()
                       .subscribe((mail:MessagesInterface[])=>{
                        this.makeTable(mail)
                        
                       });
  }
  makeTable = (mail)=>{
    this.dataSource =  new MatTableDataSource(mail);
    this.dataSource.paginator = this.paginator
    this.backendService.masterToggleState(this.selection,this.dataSource)
  }
  ngOnDestroy(){
    this.backendService.resetList()
    this.backendService.selected_items = [  ]
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
    this.backendService.selected_items = this.selection.selected
  }
  selectElement(el){
    this.selection.toggle(el)
    this.backendService.selected_items = this.selection.selected
    console.log(this.backendService.selected_items)
  }
}
