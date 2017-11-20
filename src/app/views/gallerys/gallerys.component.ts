import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../backend.service';
import { GalerijaInterface } from '../../intercafe.enum'
import { ElementRef } from '../../../../../myApp/node_modules/@angular/core/src/linker/element_ref';
@Component({
  selector: 'app-gallerys',
  templateUrl: './gallerys.component.html',
  styleUrls: ['./gallerys.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GallerysComponent implements OnInit,OnDestroy {

  constructor(private route: ActivatedRoute, private backendService: BackendService) {
    this.route.params.subscribe(params => {
      this.id = params['id']; 
   });
   }
  id : string;
  galleries :Array<GalerijaInterface> = []
  deleteList :Array<string> = []
  ngOnInit() {
    this.backendService.getGalleries(this.id).subscribe(data=>{this.galleries = data},
                                                        err =>{console.log(err)},
                                                        ()=>{console.log('galleris loaded')})
    console.log('this is gallery component')
  }
  ngOnDestroy(){
    this.backendService.addToList = false
  }
  addToList(id,element){
    console.log(id)
    for(let i of this.deleteList){
      console.log(i)
      if(id == i){
        let index = this.deleteList.indexOf(id)
        this.deleteList.splice(index,1)
        console.log('this allredy in list, removing')
        element.className = 'select-item'
        return;
      }
    } 
    this.deleteList.push(id)
    element.className += ' selected'
    console.log(this.deleteList )
    console.log(element)
  }
}
