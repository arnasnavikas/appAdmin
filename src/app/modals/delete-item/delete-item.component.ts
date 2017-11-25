import { Component, OnInit, ViewEncapsulation,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BackendService } from '../../backend.service'
@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeleteItemComponent implements OnInit {
  
  constructor(public dialogRef: MatDialogRef<DeleteItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private backendService : BackendService) { }
    private deleted = false
    private deleting = null
    ngOnInit() {
    }
    deleteGroup(){
      console.log(this.data)
      this.backendService.deleteGroup([this.data.id])
                         .subscribe(data=>{console.log(data)},
                                    err=>{console.log(err)},
                                    ()=>{this.deleting = false; 
                                         this.deleted = true; 
                                         this.backendService.loadGroups();
                                         setTimeout(this.onNoClick,2000)
                                        })
      console.log(this.data)
    }
    deletePrivateImage(){
      this.backendService.deletePrivateImages([this.data._id])
                         .subscribe(data=>{console.log(data)},
                                    err=>{console.log(err)},
                                    ()=>{ this.deleting = false; 
                                           this.deleted = true;
                                           this.backendService.loadPrivatePictures();
                                           setTimeout(this.onNoClick,2000)
                                          })
    }
    deleteGalleryImage(){
      this.backendService.deleteGalleryImages([this.data._id])
                         .subscribe(data=>{console.log(data)},
                                    err=>{console.log(err)},
                                    ()=>{this.deleting = false; 
                                      this.deleted = true;
                                      this.backendService.loadGalleryPictures();
                                      setTimeout(this.onNoClick,2000)})
    }
    confirm(){
      this.deleting = true
      switch (this.backendService.single_delete_type) {
        case 'grupę':
        this.deleteGroup()
        break;
        case 'paveikslėlį':
        this.deletePrivateImage()
        break;
        case 'nuotrauką':
        this.deleteGalleryImage()
        console.log('deleting gallery image')
        break;
        
        default:
          console.log('no or wrong "single_delete_type" was provided')
          console.log('current value is '+this.backendService.single_delete_type)
          
        break;
      }
  }
  private onNoClick = ()=>{
    this.dialogRef.close();
  }
}
