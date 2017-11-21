import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { BackendService } from '../../backend.service'
import { GroupInterface } from '../../intercafe.enum'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DeleteGroupComponent } from '../../modals/delete-group/delete-group.component'
import { NewGalleryComponent } from '../../modals/new-gallery/new-gallery.component'
import { Router } from '@angular/router'
import { RenameGroupComponent } from '../../modals/rename-group/rename-group.component'
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
    let dialogRef = this.dialog.open(DeleteGroupComponent, {
      width: '250px',
      data: group
    });
  }
  newGallery(group:GroupInterface){
        let dialogRef = this.dialog.open(NewGalleryComponent, {
          width: '500px',
          data : group
        });
  }
  changeName(group:GroupInterface){
    this.dialog.open(RenameGroupComponent,{
      width:'250px',
      data:group
    })
  }
}

