import { Component, OnInit, ViewEncapsulation,OnDestroy } from '@angular/core';
import { BackendService } from '../../backend.service'
import { GalerijaInterface,PictureInterface} from '../../intercafe.enum'
import { DeleteItemComponent } from '../../modals/delete-item/delete-item.component'
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { ActivatedRoute, Router} from "@angular/router"
import { AddDescriptionComponent } from '../../modals/add-description/add-description.component'
import { AuthService } from '../../auth.service'
import { Route } from '@angular/router/src/config';
@Component({
  selector: 'app-private-images',
  templateUrl: './private-images.component.html',
  styleUrls: ['./private-images.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PrivateImagesComponent implements OnInit,OnDestroy {

  constructor(public backendService: BackendService,
              public dialog: MatDialog,
              public router: ActivatedRoute
              ) {
                this.backendService.userValidation()
               }
  openGallery = false;
  clicked_Img // for gallery slider
  ngOnInit() {
    console.log('private picture component init()')
    // load pictures for gallery images
    this.router.params.subscribe(params=>{
      if(Object.keys(params).length == 2){
        this.backendService.gallery_id = params.gallery_id
        this.backendService.item_type = 'gallery-image'
        this.backendService.loadGalleryPictures()
        console.log('this probably is gallery images...')
        return;
      }
      // load images for private pictures
        this.backendService.item_type = 'private-image'
        this.backendService.loadPrivatePictures()
        console.log('this is definatley private images')
    })
  }
  ngOnDestroy(){
    // this.backendService.pictures = []
    this.backendService.resetList()
  }
  editDescrition(picture:PictureInterface){
    this.dialog.open(AddDescriptionComponent,{
      width:'250px',
      data:picture
    })
  }
  addCoverImage(image: PictureInterface){
    for(let pic of this.backendService.pictures)
      pic.gallery_cover = false
    image.gallery_cover = true
    this.backendService.addCoverPicture(image)
                       .subscribe(data=>{console.log('this is response');console.log(data)},
                                  err=>{console.log(err)},
                                  ()=>{ this.backendService.showSuccessMessage('Viršelis pridėtas','Gerai',3000)})
    // console.log(image)
  }
}
