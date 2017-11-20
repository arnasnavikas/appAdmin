import { Component, OnInit, ViewEncapsulation,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BackendService } from '../../backend.service'
@Component({
  selector: 'app-rename-gallery',
  templateUrl: './rename-gallery.component.html',
  styleUrls: ['./rename-gallery.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RenameGalleryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RenameGalleryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private backendService: BackendService,
              private _fb: FormBuilder ){}
renameForm : FormGroup
  ngOnInit() {
    this.renameForm = this._fb.group({ name:     this._fb.control(this.data.name,[Validators.required]),
                                       id:       this._fb.control(this.data.id,[Validators.required]),
                                       routeName:this._fb.control('',[Validators.required])
                                      })
  }
  renameGallery(){
    let route = this.renameForm.controls['name'].value.replace(/[\W_]+/g,"-") 
    this.renameForm.controls['routeName'].setValue(route)
      if(this.renameForm.valid){
        this.backendService.renameGallery(this.renameForm.value)
                          .subscribe(data=>{console.log(data)},
                                      err=>{console.log(err)},
                                      ()=>{this.dialogRef.close();
                                          this.backendService.loadGallerys(this.backendService.group_id)})
      }
    }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
