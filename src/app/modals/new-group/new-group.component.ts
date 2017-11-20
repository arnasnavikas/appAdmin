import { Component, OnInit, ViewEncapsulation,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BackendService } from '../../backend.service'
import { GroupInterface } from '../../intercafe.enum'
@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewGroupComponent {

  constructor(public dialogRef: MatDialogRef<NewGroupComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
              private backendService: BackendService, private _fb: FormBuilder ) { 
                this.newGroup = this._fb.group({ imgURL:      this._fb.control(''),
                                                 newMessages: this._fb.control(0),
                                                 pavadinimas: this._fb.control('',[Validators.required]),
                                                 route:       this._fb.control(''),
                                                 aprasymas:   this._fb.control(''),
                                                 folder_name: this._fb.control('')
                                            });
    }
  private created = false // for group created notification show 
  private submited = false //for spinner display while response from server is comming
  private newGroup : FormGroup
                 
  onNoClick(): void {
    this.dialogRef.close();
  }

  createGroup(){
    if(this.newGroup.controls['pavadinimas'].hasError('required'))
      console.log('field is empty')
    else{
      this.submited = true;
      let routerName = this.newGroup.controls['pavadinimas'].value
      routerName = routerName.replace(/[\W_]+/g,"-") 
      this.newGroup.controls['route'].setValue(routerName) 
      let date ="_"+Date.now()
      routerName = routerName+date
      this.newGroup.controls['folder_name'].setValue(routerName) 
      this.backendService.createGroup(this.newGroup.value).subscribe(data=>{console.log(data)},
                                                                     err=>{console.log(err);},
                                                                     ()=>{ this.submited = false; 
                                                                           this.created = true;
                                                                           this.backendService.loadGroups() })
    }
  }

}
