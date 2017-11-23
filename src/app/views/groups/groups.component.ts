import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { BackendService } from '../../backend.service'
import { GroupInterface } from '../../intercafe.enum'
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { DeleteItemComponent } from '../../modals/delete-item/delete-item.component'
import { NewGalleryComponent } from '../../modals/new-gallery/new-gallery.component'
import { Router } from '@angular/router'
import { RenameGroupComponent } from '../../modals/rename-group/rename-group.component'
import { AddGroupCoverComponent } from '../../modals/add-group-cover/add-group-cover.component'
import { AddGroupDescriptionComponent } from '../../modals/add-group-description/add-group-description.component'
@Component({
  selector: 'app-home',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GroupsComponent implements OnInit, OnDestroy {
  constructor(private backendService: BackendService,
              public dialog: MatDialog,
              private router : Router) {}
  ngOnInit() {
    this.backendService.what_object_delete = 'group'
    this.backendService.getGroups().subscribe(data =>{ this.backendService.groups = data; console.log(data)},
                                              err=>{ console.log(err)},
                                              ()=>{console.log('groups loaded')})
  }
  ngOnDestroy(){
    this.backendService.what_object_delete = ''
    this.backendService.addToList = false
 }
  deleteGroup(group:GroupInterface){
    console.log(group)
    let dialogRef = this.dialog.open(DeleteItemComponent, {
      width: '250px',
      data : {id:group._id, name:group.pavadinimas, type:'grupę'}
    });
  }
  newGallery(group:GroupInterface){
    let dialogRef = this.dialog.open(NewGalleryComponent, {
      width: '500px',
      data: group
      });
  }
  changeName(group:GroupInterface){
    this.dialog.open(RenameGroupComponent,{
      width:'250px',
      data:group
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
    this.dialog.open(AddGroupDescriptionComponent,{
      width:'320px',
      height: '400px',
      data:group
    })
  }
}

