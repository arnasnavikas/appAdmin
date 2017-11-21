import { Component, OnInit, ViewEncapsulation,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BackendService } from '../../backend.service'
import { GroupInterface } from '../../intercafe.enum'
@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeleteGroupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteGroupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GroupInterface,
              private backendService : BackendService) { }
  private deleted = false
  private deleting = null
  private name
  ngOnInit() {
    this.name = this.data.pavadinimas
  }
  deleteGroup(){
    this.deleting = true
    console.log(this.data)
    this.backendService.deleteGroup([this.data._id])
                       .subscribe(data=>{console.log(data)},
                                  err=>{console.log(err)},
                                  ()=>{this.deleting = false; this.deleted = true; this.backendService.loadGroups()})
    console.log(this.data)
  }
  onNoClick(){
    this.dialogRef.close();
  }
}
