import { Component, OnInit, ViewEncapsulation,OnDestroy } from '@angular/core';
import { BackendService } from '../../backend.service'
import { GalerijaInterface,PictureInterface} from '../../intercafe.enum'
import { DeleteItemComponent } from '../../modals/delete-item/delete-item.component'
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { ActivatedRoute } from "@angular/router"
import { AddDescriptionComponent } from '../../modals/add-description/add-description.component'
@Component({
  selector: 'app-private-images',
  templateUrl: './private-images.component.html',
  styleUrls: ['./private-images.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PrivateImagesComponent implements OnInit,OnDestroy {

  constructor(private backendService: BackendService,
              public dialog: MatDialog,
              public router: ActivatedRoute) { }
  openGallery = false;
  clicked_Img
  ngOnInit() {
    console.log('private picture component init()')
    // load pictures for gallery images
    this.router.params.subscribe(params=>{
      if(Object.keys(params).length == 2){
        this.backendService.gallery_id = params.gallery_id
        // set what to delete for multiple deletion
        this.backendService.multiple_delete_type = 'gallery-images'
        // set what to delete for single deletion
        this.backendService.single_delete_type = 'nuotrauką'
        this.backendService.loadGalleryPictures()
        console.log('this probably is gallery images...')
        return;
      }
      // load images for private pictures
        this.backendService.multiple_delete_type = 'private-pictures'
        this.backendService.single_delete_type = 'paveikslėlį'
        this.backendService.loadPrivatePictures()
        console.log('this is definatley private images')
    })
  }
  ngOnDestroy(){
    this.backendService.pictures = []
  }
  deleteImage(picture,event){
    event.stopPropagation()
    this.dialog.open(DeleteItemComponent,{
      width: '250px',
      data: picture
    })
  }
  editDescrition(picture:PictureInterface,event){
    event.stopPropagation()
    this.dialog.open(AddDescriptionComponent,{
      width:'250px',
      data:picture
    })
  }
}
