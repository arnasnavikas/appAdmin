import { Component,OnInit,ViewEncapsulation} from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewItemComponent } from '../../modals/new-item/new-item.component' 
import { BackendService } from '../../backend.service'
import { TableEditComponent } from '../table-edit/table-edit.component'
import { serverResponse } from '../../intercafe.enum'
import { DeleteItemComponent } from '../../modals/delete-item/delete-item.component'
import { Location } from '@angular/common'
import { AuthService } from '../../auth.service'
import { Router} from '@angular/router'
import { StatusComponent} from '../../modals/status/status.component'
import { AddMemberComponent} from '../../modals/add-member/add-member.component'
@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})  
export class MenuBarComponent implements OnInit{

    constructor(public dialog: MatDialog,
      private backendService : BackendService,
      private location : Location,
      public authService: AuthService,
    private router : Router) {
      }
    ngOnInit(){
      this.backendService.item_type = ""
    }
  createNewGroup(): void {
  let dialogRef = this.dialog.open(NewItemComponent, {
  width: '250px',
  data : {type:'group'}
  });
  }
  //turns on/off multiple delete button options in menu bar
  createList(){
  this.backendService.addToList = this.backendService.addToList? false:true
  }
  addTableRow(){
  this.backendService.addTableRow(this.backendService.group_id)
                .subscribe((row)=>{
                  this.backendService.table_rows.push(row)
                })
  }
  deleteItems(){
    let dialogRef = this.dialog.open(DeleteItemComponent, {
    width: '250px'
    });
  }
  changeStatus(){
    let dialogRef = this.dialog.open(StatusComponent, {
    width: '250px'
    });
  }
  add_team_memeber(){
    let dialogRef = this.dialog.open(AddMemberComponent, {
    width: '250px'
    });
  }
}
