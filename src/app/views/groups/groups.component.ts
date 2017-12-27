import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { BackendService } from '../../backend.service'
import { GroupInterface,GalerijaInterface,PictureInterface } from '../../intercafe.enum'
import { MatDialog } from '@angular/material';
import { DeleteItemComponent } from '../../modals/delete-item/delete-item.component'
import { RenameComponent } from '../../modals/rename/rename.component'
import { AddGroupCoverComponent } from '../../modals/add-group-cover/add-group-cover.component'
import { AddDescriptionComponent } from '../../modals/add-description/add-description.component'
import { NewItemComponent } from '../../modals/new-item/new-item.component';
import { AuthService } from '../../auth.service'
import { Router} from '@angular/router'
 @Component({
  selector: 'app-home',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GroupsComponent implements OnInit, OnDestroy {
  constructor(public backendService: BackendService,
              public dialog: MatDialog,
              public authService :AuthService,
              private router: Router) {
                this.backendService.userValidation()
              }
  // private openGallery = false
  // private groupAvatar :PictureInterface[] 
  ngOnInit() {
    this.backendService.item_type = 'group'
    this.backendService.getGroups(this.backendService.selected_user._id)
                       .subscribe((groups:GroupInterface[])=>{
                         if(groups.length == 0){
                           this.backendService.groups = []
                           this.dialog.open(NewItemComponent,{
                             width: '250px',
                             data : {type:'group'}
                           })
                         }else{
                           this.backendService.groups = groups
                         }
                       })
  }
  ngOnDestroy(){
    this.backendService.resetList()
 }
  newGallery(group:GroupInterface){
    this.dialog.open(NewItemComponent, {
      width: '250px',
      data: {group:group,type:'gallery'}
      });
    }
  changeName(group:GroupInterface){
    this.dialog.open(RenameComponent,{
      width:'250px',
      data:{type:'group',group:group}
    })
  }
  addCover(group:GroupInterface){
    // let WindowHeight = window.innerHeight < 500 ? window.innerHeight : window.innerHeight -100
    this.dialog.open(AddGroupCoverComponent,{
      height: '500px',
      data : {group:group, type:'add'}
    })
  }
  removeCover(group: GroupInterface){
    this.dialog.open(AddGroupCoverComponent,{
      height: '500px',
      data : {group:group, type:'remove'}
    })
  }
  addDescription(group:GroupInterface){
    this.dialog.open(AddDescriptionComponent,{
      width:'250px',
      data:group
    })
  }
  // showAvatar(group:GroupInterface){
  //   this.groupAvatar = [{ name        : group.name,
  //                         imgURL      : group.imgURL}]
  //   this.openGallery = true;
  // }
}

