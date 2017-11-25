import { Component, OnInit, ViewEncapsulation,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BackendService } from '../../backend.service'
import { GroupInterface } from '../../intercafe.enum';
@Component({
  selector: 'app-rename',
  templateUrl: './rename.component.html',
  styleUrls: ['./rename.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RenameComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RenameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private backendService: BackendService,
    private _fb: FormBuilder ){}
    ngOnInit() {
      
      switch (this.backendService.multiple_delete_type) {
        case 'group':
        console.log('renaming group')
        this.renameForm = this._fb.group({ name:this._fb.control(this.data.name,[Validators.required]),
                                           id:this._fb.control(this.data._id),
                                           route :this._fb.control('')
        })
          break;
          case 'gallery':
          console.log('renaming gallery')
          console.log(this.data)
          this.renameForm = this._fb.group({ name:this._fb.control(this.data.name,[Validators.required]),
                                             id: this._fb.control(this.data._id),
                                             route:this._fb.control('',[Validators.required])
           })
          break;
          case 'table':
          console.log('renaming table')
          
          break;
      
        default:
          break;
      }
    }
    private renameForm: FormGroup
  rename_group(){
    if(this.renameForm.valid){
      let route = this.renameForm.controls['name'].value.replace(/[\W_]+/g,"-") 
      this.renameForm.controls['route'].setValue(route)
      this.backendService.renameGroup(this.renameForm.value)
      .subscribe( data=>{console.log(data)},
                  err=>{console.log(err)},
                  ()=>{this.data.name = this.renameForm.value.name
                       this.dialogRef.close()})
      }
  }
  rename_gallery(){
    let route = this.renameForm.controls['name'].value.replace(/[\W_]+/g,"-") 
    this.renameForm.controls['route'].setValue(route)
      if(this.renameForm.valid){
        this.backendService.renameGallery(this.renameForm.value)
                          .subscribe(data=>{console.log(data)},
                                      err=>{console.log(err)},
                                      ()=>{this.dialogRef.close();
                                          this.data.name = this.renameForm  .value.name})
      }
    }
  rename(){
    switch (this.backendService.multiple_delete_type) {
      case 'group':
        this.rename_group()
        break;
      case 'gallery':
        this.rename_gallery()
        break;
    
      default:
        break;
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
