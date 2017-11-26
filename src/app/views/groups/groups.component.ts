import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { BackendService } from '../../backend.service'
import { GroupInterface,GalerijaInterface,TableStruct } from '../../intercafe.enum'
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { DeleteItemComponent } from '../../modals/delete-item/delete-item.component'
import { RenameComponent } from '../../modals/rename/rename.component'
import { AddGroupCoverComponent } from '../../modals/add-group-cover/add-group-cover.component'
// import { AddGroupDescriptionComponent } from '../../modals/add-group-description/add-group-description.component'
import { AddDescriptionComponent } from '../../modals/add-description/add-description.component'
import { NewItemComponent } from '../../modals/new-item/new-item.component';
@Component({
  selector: 'app-home',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GroupsComponent implements OnInit, OnDestroy {
  constructor(private backendService: BackendService,
              public dialog: MatDialog) {}
  ngOnInit() {
    this.backendService.multiple_delete_type = 'group'
    this.backendService.single_delete_type='grupę'
    this.backendService.loadGroups()
  }
  ngOnDestroy(){
    this.backendService.multiple_delete_type = ''
    this.backendService.addToList = false
 }
  deleteGroup(group:GroupInterface){
    let dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '250px',
      data : {id:group._id, name:group.name}
    });
  }
  newGallery(group:GroupInterface){
    let dialogRef = this.dialog.open(NewItemComponent, {
      width: '250px',
      data: {group:group,type:'gallery'}
      });
    }
  newTable(group:GroupInterface){
      let dialogRef = this.dialog.open(NewItemComponent, {
        width: '250px',
        data: {group:group,type:'table'}
        });
  }
  changeName(group:GroupInterface){
    this.dialog.open(RenameComponent,{
      width:'250px',
      data:{type:'group',group:group}
    })
  }
  renameTable(group:GroupInterface){
    this.dialog.open(RenameComponent,{
      width:'250px',
      data:{type:'table',group:group}
    })
  }
  addCover(group:GroupInterface){
    let WindowHeight = window.innerHeight < 500 ? window.innerHeight : window.innerHeight -100
    this.dialog.open(AddGroupCoverComponent,{
      height: WindowHeight+'px',
      data : group
    })
  }
  addDescription(group:GroupInterface){
    this.dialog.open(AddDescriptionComponent,{
      width:'250px',
      data:group
    })
  }
}

