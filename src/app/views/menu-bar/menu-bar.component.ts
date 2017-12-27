import { Component,OnInit,ViewEncapsulation} from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewItemComponent } from '../../modals/new-item/new-item.component' 
import { BackendService } from '../../backend.service'
import { DeleteItemComponent } from '../../modals/delete-item/delete-item.component'
import { AddMemberComponent} from '../../modals/add-member/add-member.component'
import { Location } from '@angular/common'
import { AuthService } from '../../auth.service'
@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})  
export class MenuBarComponent implements OnInit{
    constructor(public dialog: MatDialog,
      public backendService : BackendService,
      public location: Location,
      public authService : AuthService) {
          this.backendService.userValidation()
      }
    ngOnInit(){
      console.log('authorozation succssefull initializing menu bar')
      this.backendService.item_type = ""
    }
  createNewGroup(): void {
   this.dialog.open(NewItemComponent, {
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
    if(this.backendService.selected_items.length>0){
      this.dialog.open(DeleteItemComponent, {
        width: '250px'
      });
    }
  }

  add_team_memeber(){
     this.dialog.open(AddMemberComponent, {
    width: '250px'
    });
  }
}
