import { Component, OnInit, ViewEncapsulation,OnDestroy } from '@angular/core';
import { BackendService } from '../../backend.service'
import { PicsInterfase} from '../../intercafe.enum'
@Component({
  selector: 'app-private-images',
  templateUrl: './private-images.component.html',
  styleUrls: ['./private-images.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PrivateImagesComponent implements OnInit,OnDestroy {

  constructor(private backendService: BackendService) { }
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
}
