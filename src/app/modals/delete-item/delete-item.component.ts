import { Component, OnInit, ViewEncapsulation,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BackendService } from '../../backend.service'
interface data{
  name: string,
  id: string,
  type: string
}
@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeleteItemComponent implements OnInit {
  
  constructor(public dialogRef: MatDialogRef<DeleteItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: data,
    private backendService : BackendService) { }
    private deleted = false
    private deleting = null
    private name
    private type
    ngOnInit() {
      this.name = this.data.name 
      this.type = this.data.type
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
      this.backendService.deletePrivateImages([this.data.id])
                         .subscribe(data=>{console.log(data)},
                                    err=>{console.log(err)},
                                    ()=>{ this.deleting = false; 
                                           this.deleted = true;
                                           this.backendService.loadPrivatePictures();
                                           setTimeout(this.onNoClick,2000)
                                          })
    }
    confirm(){
      this.deleting = true
      switch (this.data.type) {
        case 'grupę':
        this.deleteGroup()
        break;
        case 'paveikslėlį':
        this.deletePrivateImage()
        break;
        
        default:
        break;
      }
      // this.dialogRef.close()
  }
  private onNoClick = ()=>{
    this.dialogRef.close();
  }
}
