import { Component, OnInit, ViewEncapsulation,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BackendService } from '../../backend.service'
import { GroupInterface,GalerijaInterface,PictureInterface } from '../../intercafe.enum'
import { MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-description',
  templateUrl: './add-description.component.html',
  styleUrls: ['./add-description.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddDescriptionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddDescriptionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public backendService: BackendService,
              private _fb: FormBuilder,
              public snackBar: MatSnackBar){}
  public descriptionForm:FormGroup
  ngOnInit() {
    this.descriptionForm = this._fb.group({id:this._fb.control(this.data._id,[Validators.required]),
                                          description: this._fb.control(this.data.description)})
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  update_gallery_description = ()=>{
    this.backendService.updateGalleryDescription(this.descriptionForm.value)
                        .subscribe(data=>{console.log(data)},
                                   err=>{console.log(err)},
                                   ()=>{this.data.description = this.descriptionForm.value.description;
                                        this.dialogRef.close();
                                        this.backendService.showSuccessMessage('Aprašymas pridėtas','',2000)})
  }
  update_image_description = ()=>{
    console.log('updating image description')
    this.backendService.addImageDescription(this.descriptionForm.value)
                        .subscribe(data=>{console.log(data)},
                                    err=>{console.log(err)},
                                   ()=>{this.data.description = this.descriptionForm.value.description
                                        this.dialogRef.close();
                                        this.backendService.showSuccessMessage('Aprašymas pridėtas','',2000)})
  }
  update_group_description = ()=>{
    console.log('updating group description')
    this.backendService.changeGroupDecription(this.descriptionForm.value)
    .subscribe(data=>{console.log(data)},
               err=>{console.log(err)},
               ()=>{this.data.description = this.descriptionForm.value.description
                    this.dialogRef.close();
                    this.backendService.showSuccessMessage('Aprašymas pridėtas','',2000)})
  }
  updateDescription(){
    switch (this.backendService.item_type) {
      case 'group':
        this.update_group_description()
        console.log('upadting group description')
        console.log(this.data)
        break;
        case 'gallery-image':
        console.log('upadting gallery image description')
        this.update_image_description()
        console.log(this.data)
        break;
        case 'private-image':
        console.log('upadting private image description')
        this.update_image_description()
        console.log(this.data)
        break;
        case 'gallery':
        this.update_gallery_description()
        console.log('upadting gallery description')
        console.log(this.data)
        break;
      default:
        break;
    }
    console.log(this.descriptionForm.value)
  }
}
