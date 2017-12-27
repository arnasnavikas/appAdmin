import { Component, OnInit,ViewChild,ViewEncapsulation,OnDestroy, AfterViewInit} from '@angular/core';
import { BackendService } from '../../backend.service'
import { ActivatedRoute } from '@angular/router'
import { MessagesInterface} from '../../intercafe.enum'
import { MatTableDataSource,MatPaginator} from '@angular/material';
@Component({
  selector: 'app-user-mail',
  templateUrl: './user-mail.component.html',
  styleUrls: ['./user-mail.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UserMailComponent implements OnInit,OnDestroy,AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public backendService: BackendService,private _router: ActivatedRoute) { }
  displayedColumns = ['select','info','email', 'message','status'];
  mailOption = [
    {viewValue:'Naujas',value:'user-mail-new'},
    {viewValue:'Žiurėtas',value:'user-mail-view'},
    {viewValue:'Atsakytas',value:'user-mail-answer'},
    {viewValue:'Visas',value:'user-mail-all'},
  ]
  ngOnInit() {
    this.backendService.item_type = 'user-mail-new'
    this.backendService.getNewMessages()
                       .subscribe((mail:MessagesInterface[])=>{
                        this.backendService.dataSource.data = mail
                       });
  }
  ngAfterViewInit(){
    this.backendService.dataSource.paginator = this.paginator
  }
  ngOnDestroy(){
    this.backendService.resetList()
    this.backendService.selected_items = []
  }
  getMail(val){
    this.backendService.selected_items = []
    this.backendService.selection.clear()
    this.backendService.item_type = val
    this.backendService.addToList = false;
    this.backendService.getMessages(val)
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.backendService.dataSource.filter = filterValue;
    console.log(this.backendService.selection)
  }

  // adds element to list after checkbox is checked
  selectElement(el){
    this.backendService.selection.toggle(el)
    this.backendService.selected_items = this.backendService.selection.selected
    console.log(this.backendService.selected_items)
  }
}
