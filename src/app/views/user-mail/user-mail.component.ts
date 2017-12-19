import { Component, OnInit,ViewChild,ViewEncapsulation} from '@angular/core';
import { BackendService } from '../../backend.service'
import { ActivatedRoute } from '@angular/router'
import { MessagesInterface} from '../../intercafe.enum'
import { MatTableDataSource,MatPaginator} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
@Component({
  selector: 'app-user-mail',
  templateUrl: './user-mail.component.html',
  styleUrls: ['./user-mail.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class UserMailComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private backendService: BackendService,private _router: ActivatedRoute) { }
  mails : MessagesInterface[] = []
  displayedColumns = ['select','info','email', 'message','status'];
  dataSource
  selection = new SelectionModel<Element>(true, []);
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    console.log(this.selection)
  }

  ngOnInit() {
    this.backendService.item_type = 'user-mail'
    this.backendService.getUserMail()
                       .subscribe((mail:MessagesInterface[])=>{
                        let mails = mail.filter(item=>item.newMail == true);
                        this.dataSource =  new MatTableDataSource(mail);
                        this.dataSource.paginator = this.paginator
                       });
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
  }
  selectElement(el){
    this.selection.toggle(el)
    this.backendService.selected_items = this.selection.selected
    console.log(this.backendService.selected_items)
  }
}
