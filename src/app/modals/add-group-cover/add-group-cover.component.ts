import { Component, OnInit, ViewEncapsulation,Inject,OnDestroy} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BackendService } from '../../backend.service'
import { PictureInterface,GroupInterface } from '../../intercafe.enum'
import { DeleteItemComponent} from '../../modals/delete-item/delete-item.component'
interface paginator {pageIndex: number,
                     pageSize: number,
                     length: number }
@Component({
  selector: 'app-add-group-cover',
  templateUrl: './add-group-cover.component.html',
  styleUrls: ['./add-group-cover.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddGroupCoverComponent implements OnInit,OnDestroy {

  constructor(public dialogRef: MatDialogRef<AddGroupCoverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private backendService : BackendService) { }

  private images : Array<PictureInterface> = []
  private showedImages = []
  length;
  pageSize = 5  ;
  pageSizeOptions = [5, 10, 25, 100];
  private button_color
  firstView = { pageIndex: 0,
                pageSize: this.pageSize,
                length: this.length}
  private loadImages = ()=>{
    this.backendService.getPrivateImages()
                      .subscribe(pictures =>{this.images = pictures},
                                  err=>{console.log(err)},
                                  ()=>{ this.length = this.images.length
                                        this.updateView(this.firstView)
                                    })
  }
  ngOnInit() {
    switch (this.data.type) {
      case 'add':
        this.button_color = 'primary'
        this.loadImages()
        break;
        case 'member-add-picture':
        this.button_color = 'primary'
        console.log('adding picture to member')
        this.loadImages()
        break;
        case 'remove':
        this.button_color = 'warn'
          this.backendService.getOneGroup(this.data.group._id)
                             .subscribe(group=>{
                                this.images = group.imgURL
                                this.length = this.images.length
                                this.updateView(this.firstView)
                             })
      default:
        break;
    }
  }
  ngOnDestroy(){
    switch (this.data.type) {
      case 'member-add-picture':
      break;
      default:
      this.backendService.resetList()
      break;
    }
  }
  // pagination logic
  updateView(e:paginator){
    this.showedImages = []
    let start_index = e.pageIndex * e.pageSize
    let length = this.images.length
      for(let i=0; i <= e.pageSize-1; i++){
        let index = start_index + i
        if(index < length)
          this.showedImages.push(this.images[start_index+i])
      }
  }
  update(){
    switch (this.data.type) {
      case 'add':
      console.log('adding conver images')
      this.backendService.addGroupCover(this.data.group._id)
                         .subscribe(data=>{console.log(data)},
                                    err=>{console.log(err)},
                                          ()=>{ this.backendService.showSuccessMessage('Nuotraukos priskirtos',this.data.group.name,3000)
                                                this.data.group.imgURL = this.backendService.selected_items
                                                this.backendService.resetList()
                                        });
      
      break;
      case 'remove':
      console.log('removing conver images')
      this.backendService.removeGroupCover(this.data.group._id)
                          .subscribe(data =>{console.log(data)},
                                     err=>{console.log(err)},
                                     ()=>{
                                       for(let image of this.backendService.selected_items)
                                         this.showedImages = this.images.filter((img:PictureInterface)=>img._id != image._id)
                                         console.log(this.showedImages)
                                        this.backendService.loadGroups()
                                        this.backendService.showSuccessMessage('Nuotraukos ištrintos','',3000);
                                        this.backendService.resetList()
                                       });
        break;
        case 'member-add-picture':
        this.dialogRef.close()
        break;                             
      default:
        break;
    }
  }
}
