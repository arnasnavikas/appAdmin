import { Component, OnInit, ViewEncapsulation,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BackendService } from '../../backend.service'
import { GalerijaInterface, GroupInterface } from '../../intercafe.enum'
// import { NewGroupComponent } from '../new-group/new-group.component';

@Component({
  selector: 'app-new-gallery',
  templateUrl: './new-gallery.component.html',
  styleUrls: ['./new-gallery.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewGalleryComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewGalleryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: GroupInterface,
              private backendService: BackendService, 
              private _fb: FormBuilder){
                this.newGallery = this._fb.group({ 
                                                   gallery_name: this._fb.control('',[Validators.required]),
                                                   aprasymas: this._fb.control(''),
                                                   route_name: this._fb.control(''),
                                                   group_name: this._fb.control(this.data.folder_name),
                                                   group_id:  this._fb.control(this.data._id),
                                                   folder_name: this._fb.control(''),
                });
               }
  newGallery: FormGroup
  galleryName : FormGroup
  galleryDescription : FormGroup
  galleryCreated = false
  ngOnInit() {
    this.galleryName = this._fb.group({
      name: this._fb.control('')
    });
    this.galleryDescription = this._fb.group({
      description: this._fb.control('')
    });
  }
   closeModal = ()=>{
    this.dialogRef.close()
   }
  createGallery(){
    let name = this.galleryName.controls['name'].value
    this.newGallery.controls['gallery_name'].setValue(name)
    this.newGallery.controls['aprasymas'].setValue(this.galleryDescription.controls['description'].value)
    name = name.replace(/[\W_]+/g,"-") 
    this.newGallery.controls['route_name'].setValue(name)
    name = name +"_"+Date.now()
    this.newGallery.controls['folder_name'].setValue(name)
    this.backendService.createGallery(this.newGallery.value)
                       .subscribe(data=>{console.log(data)},
                                  err =>{console.log(err)},
                                  ()=>{this.galleryCreated = true;
                                       this.data.gallerys = this.data.gallerys+1
                                       setTimeout(this.closeModal,2000)})
  }
}
