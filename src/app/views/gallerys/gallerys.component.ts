import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { BackendService } from '../../backend.service';
import { GalerijaInterface,GroupInterface } from '../../intercafe.enum'
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
               private dialog: MatDialog,
               private router : Router) {
              }
  private group :GroupInterface;
  ngOnInit(){ this.backendService.what_object_delete = 'gallery'
              this.route.params.subscribe(params=>{
                  this.backendService.getOneGroup(params.group_id)
                  .subscribe((group :GroupInterface)=>{this.group = group;
                                      this.backendService.group_id = group._id},
                    err=>{console.log(err)},
                    ()=>{this.backendService.loadGallerys(this.group._id)})
                  })
          console.log('gallerty component init')
    }
    ngOnDestroy(){
      this.backendService.addToList = false
      this.backendService.what_object_delete = ''
  }
  changeName(id,oldName){
    this.dialog.open(RenameGalleryComponent,{
      width: '250px',
      data: {id:id,name:oldName,group_id:this.group._id}
    })
  } 
  editDescription(id,aprasymas){
    this.dialog.open(GalleryDescriptionComponent,{
      width:'320px',
      data:{id:id,description:aprasymas,group_id:this.group._id}
    })
  }
}
