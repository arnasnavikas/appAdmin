import { Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NewGroupComponent } from './modals/new-group/new-group.component' 
import { Location} from '@angular/common';
import { BackendService } from './backend.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public dialog: MatDialog,private loaction:Location, private backendService : BackendService) {}
  title = 'app';
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
}
