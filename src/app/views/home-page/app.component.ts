import { Component,ViewChild} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NewItemComponent } from '../../modals/new-item/new-item.component' 
import { BackendService } from '../../backend.service'
import { MenuPositionY} from '@angular/material/menu';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  constructor(public dialog: MatDialog,
              private backendService : BackendService) {}
    createNewGroup(): void {
    let dialogRef = this.dialog.open(NewItemComponent, {
      width: '250px',
      data : {type:'group'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  //turns on multiple delete icon in menu bar
  createList(){
    this.backendService.addToList = this.backendService.addToList? false:true
  }
  deleteItems(){
    if(this.backendService.deleteList.length == 0)
    return;
    switch (this.backendService.multiple_delete_type) {
      case "gallery":
      this.backendService.deleteGallerys(this.backendService.deleteList)
                         .subscribe(data=>{console.log(data)},
                                    err=>{console.log(err)},
                                    ()=>{this.backendService.loadGallerys(this.backendService.group_id);
                                         this.resetList()})
      console.log('deleting gallery')
      break;
      case "group":
      this.backendService.deleteGroup(this.backendService.deleteList)
                          .subscribe(data=>{console.log(data)},
                                     err=>{console.log(err)},
                                     ()=>{this.backendService.loadGroups();
                                          this.resetList()})
      break;
      case "picture":
      console.log('deleting picture')
      break;
      case "table":
      console.log('deleting tablr')
      break;
      case "gallery-images":
      this.backendService.deleteGalleryImages(this.backendService.deleteList)
                          .subscribe(data=>{console.log(data)},
                                     err=>{console.log(err)},
                                     ()=>{this.backendService.loadGalleryPictures();
                                          this.resetList()})
      break;
      case "private-pictures":
      this.backendService.deletePrivateImages(this.backendService.deleteList)
                         .subscribe(data=>{console.log(data)},
                                    err=>{console.log(err)},
                                    ()=>{this.backendService.loadPrivatePictures();
                                         this.resetList()})
      console.log('deleting private pictures')
      break;
      
      default:
      if(!this.backendService.multiple_delete_type)
        console.log('no backend.multiple_delete_type is selected');
      break;
    }
  }
  // removes class name from selected elements
  resetList(){
    this.backendService.deleteList = []
    this.backendService.addToList = false
    for(let i of this.backendService.selected_DOM_items)
      i.className ='select-item'
  }
}
