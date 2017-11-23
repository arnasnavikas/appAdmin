import { Component, OnInit, ViewEncapsulation,OnDestroy } from '@angular/core';
import { BackendService } from '../../backend.service'
import { PicsInterfase} from '../../intercafe.enum'
import { DeleteItemComponent } from '../../modals/delete-item/delete-item.component'
import { MatDialog, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-private-images',
  templateUrl: './private-images.component.html',
  styleUrls: ['./private-images.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PrivateImagesComponent implements OnInit,OnDestroy {

  constructor(private backendService: BackendService,
              public dialog: MatDialog,) { }
  openGallery = false;
  clicked_Img
  ngOnInit() {
    this.backendService.what_object_delete ='private-pictures'
    this.backendService.getPrivateImages().subscribe((pictures:Array<PicsInterfase>)=>{
      this.backendService.private_pictures = pictures;
    })
  }
  ngOnDestroy(){
    this.backendService.what_object_delete =''
    this.backendService.addToList = false
  }
  deleteImage(id,name){
    this.dialog.open(DeleteItemComponent,{
      width: '250px',
      data: {id:id,type:'paveikslėlį',name:name}
    })
  }
  openPicture(i){
    this.clicked_Img = i
  }
}
