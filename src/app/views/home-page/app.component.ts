import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NewGroupComponent } from '../../modals/new-group/new-group.component' 
import { Location} from '@angular/common';
import { BackendService } from '../../backend.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public dialog: MatDialog,
              private loaction:Location,
              private backendService : BackendService) {}
  openDialog(): void {
    let dialogRef = this.dialog.open(NewGroupComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  createList(){
    if(!this.backendService.addToList)
      this.backendService.addToList = true
    else
      this.backendService.addToList = false
  }
  updateView(){
    this.resetList();
    this.backendService.deleteList = [];
    this.backendService.loadGallerys(this.backendService.group_id)
  }
  deleteItems(){
    if(this.backendService.deleteList.length == 0)
      return;
    switch (this.backendService.what_object_delete) {
      case "gallery":
        this.backendService.deleteGallerys(this.backendService.deleteList)
                           .subscribe(data=>{console.log(data)},
                                      err=>{console.log(err)},
                                      ()=>{this.updateView()})
        console.log('deleting gallery')
        break;
        case "group":
        console.log('deleting group')
        break;
        case "picture":
        console.log('deleting picture')
        break;
        case "table":
        console.log('deleting tablr')
        break;
        case "message":
        console.log('deleting message')
        break;
    
      default:
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
