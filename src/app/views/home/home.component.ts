import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BackendService } from '../../backend.service'
import { GroupInterface } from '../../intercafe.enum'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DeleteGroupComponent } from '../../modals/delete-group/delete-group.component'
import { NewGalleryComponent } from '../../modals/new-gallery/new-gallery.component'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  constructor(private backendService: BackendService,public dialog: MatDialog) {}

  ngOnInit() {
    console.log('init homeComponent')
    this.backendService.getGroups().subscribe(data =>{ this.backendService.groups = data; console.log(data)},
                                              err=>{ console.log(err)},
                                              ()=>{console.log('groups loaded')})
  }
 
  deleteGroup(group:GroupInterface){
    console.log(group)
    let dialogRef = this.dialog.open(DeleteGroupComponent, {
      width: '250px',
      data: {id: group._id, folderName: group.folder_name}
    });
  }
  newGallery(group:GroupInterface){
        let dialogRef = this.dialog.open(NewGalleryComponent, {
          width: '500px',
          data : group
        });
  }
  updateNumber(e){
    e.stopPropagation()
  }
}

