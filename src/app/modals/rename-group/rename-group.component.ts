import { Component, OnInit, ViewEncapsulation,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BackendService } from '../../backend.service'
import { GroupInterface } from '../../intercafe.enum';
@Component({
  selector: 'app-rename-group',
  templateUrl: './rename-group.component.html',
  styleUrls: ['./rename-group.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RenameGroupComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RenameGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroupInterface,
    private backendService: BackendService,
    private _fb: FormBuilder ){}
    ngOnInit() {
      this.renameGroup = this._fb.group({ pavadinimas:  this._fb.control(this.data.pavadinimas,[Validators.required]),
        _id:    this._fb.control(this.data._id),
        route :this._fb.control('')
      })
    }
    private renameGroup: FormGroup
  _renameGroup(){
    if(this.renameGroup.valid && this.renameGroup.value.pavadinimas != this.data.pavadinimas){
      
      let route = this.renameGroup.controls['pavadinimas'].value.replace(/[\W_]+/g,"-") 
      this.renameGroup.controls['route'].setValue(route)
      this.backendService.renameGroup(this.renameGroup.value)
      .subscribe( data=>{console.log(data)},
                  err=>{console.log(err)},
                  ()=>{this.data.pavadinimas = this.renameGroup.value.pavadinimas
                       this.dialogRef.close()})
      }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
