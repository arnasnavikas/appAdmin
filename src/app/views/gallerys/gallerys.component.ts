import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from '../../backend.service';
import { GalerijaInterface } from '../../intercafe.enum'
import { MatDialog } from '@angular/material';
import { RenameGalleryComponent } from '../../modals/rename-gallery/rename-gallery.component'
import { GalleryDescriptionComponent } from '../../modals/gallery-description/gallery-description.component'
@Component({
  selector: 'app-gallerys',
  templateUrl: './gallerys.component.html',
  styleUrls: ['./gallerys.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GallerysComponent implements OnInit,OnDestroy {

  constructor( private route: ActivatedRoute,
               private backendService: BackendService,
               private dialog: MatDialog) {
      this.route.params.subscribe(params => {
        this.backendService.group_id = params['id']; 
    });
   }
  ngOnInit() {
    this.backendService.what_object_delete = 'gallery'
    this.backendService.loadGallerys(this.backendService.group_id)
    }
    ngOnDestroy(){
      this.backendService.addToList = false
      this.backendService.what_object_delete = ''
  }
  addToList(id,element){
    for(let i of this.backendService.deleteList){
      if(id == i){
        let index = this.backendService.deleteList.indexOf(id)
        this.backendService.deleteList.splice(index,1)
        this.backendService.selected_DOM_items.splice(index,1)
        element.className = 'select-item'
        return;
      }
    } 
    this.backendService.deleteList.push(id)
    this.backendService.selected_DOM_items.push(element)
    element.className += ' selected'
    console.log(this.backendService.deleteList )
    console.log(element)
  }
  changeName(id,oldName){
    this.dialog.open(RenameGalleryComponent,{
      width: '250px',
      data: {id:id,name:oldName}
    })
  } 
  editDescription(id,aprasymas){
    this.dialog.open(GalleryDescriptionComponent,{
      width:'320px',
      data:{id:id,description:aprasymas}
    })
  }
}
