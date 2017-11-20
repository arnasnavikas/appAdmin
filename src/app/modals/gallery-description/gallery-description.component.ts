import { Component, OnInit, ViewEncapsulation,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BackendService } from '../../backend.service'
import { GroupInterface } from '../../intercafe.enum'

@Component({
  selector: 'app-gallery-description',
  templateUrl: './gallery-description.component.html',
  styleUrls: ['./gallery-description.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GalleryDescriptionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GalleryDescriptionComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
  private backendService: BackendService, private _fb: FormBuilder ){ }
  private descriptionForm:FormGroup
  ngOnInit() {
    this.descriptionForm = this._fb.group({id:this._fb.control(this.data.id,[Validators.required]),
                                          description: this._fb.control(this.data.description )})
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  updateDescription(){
    this.backendService.updateGalleryDescription(this.descriptionForm.value)
                        .subscribe(data=>{console.log(data)},
                                   err=>{console.log(err)},
                                   ()=>{this.backendService.loadGallerys(this.backendService.group_id);
                                        this.dialogRef.close()})
    console.log(this.descriptionForm.value)
  }
}
