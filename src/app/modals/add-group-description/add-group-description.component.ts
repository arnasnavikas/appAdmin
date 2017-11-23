import { Component, OnInit, ViewEncapsulation,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BackendService } from '../../backend.service'
import { GroupInterface } from '../../intercafe.enum'
import { FormGroup, FormBuilder} from "@angular/forms"
@Component({
  selector: 'app-add-group-description',
  templateUrl: './add-group-description.component.html',
  styleUrls: ['./add-group-description.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddGroupDescriptionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddGroupDescriptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroupInterface,
    private backendService : BackendService,
    private _fb : FormBuilder){ }
  
    addDescription : FormGroup;
  ngOnInit() {
    this.addDescription = this._fb.group({_id:this._fb.control(this.data._id),
                                          description: this._fb.control(this.data.aprasymas)})
  }
  save(){
    this.backendService.changeGroupDecription(this.addDescription.value)
                       .subscribe(data=>{console.log(data)},
                                  err=>{console.log(err)},
                                  ()=>{this.data.aprasymas = this.addDescription.value.description
                                       this.dialogRef.close()})
  } 
  onNoClick(){
    this.dialogRef.close()
  }
}
