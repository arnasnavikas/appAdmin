import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { BackendService } from '../../backend.service';
import { GalerijaInterface,GroupInterface } from '../../intercafe.enum'
import { MatDialog } from '@angular/material';
import { RenameComponent } from '../../modals/rename/rename.component'
import { AddDescriptionComponent } from '../../modals/add-description/add-description.component'
import { DeleteItemComponent } from '../../modals/delete-item/delete-item.component'
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
  ngOnInit(){ this.backendService.item_type = 'gallery'
              this.route.params.subscribe(params=>{
                this.backendService.loadGallerys(params.group_id)
                  });
          console.log('gallerty component init')
    }
    ngOnDestroy(){
      this.backendService.addToList = false
      this.backendService.item_type = ''
  }
  changeName(gallery:GalerijaInterface){
    this.dialog.open(RenameComponent,{
      width: '250px',
      data: {type:'gallery',gallery:gallery}
    })
  } 
  editDescription(gallery:GalerijaInterface){
    this.dialog.open(AddDescriptionComponent,{
      width:'250px',
      data: gallery
    })
  }
}
