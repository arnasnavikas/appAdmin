import { Component, OnInit, ViewEncapsulation,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BackendService } from '../../backend.service'
import { PictureInterface,GroupInterface } from '../../intercafe.enum'
interface paginator {pageIndex: number,
                     pageSize: number,
                     length: number }
@Component({
  selector: 'app-add-group-cover',
  templateUrl: './add-group-cover.component.html',
  styleUrls: ['./add-group-cover.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddGroupCoverComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddGroupCoverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroupInterface,
    private backendService : BackendService) { }

  private images : Array<PictureInterface> = []
  private showedImages = []
  length;
  pageSize = 5  ;
  pageSizeOptions = [5, 10, 25, 100];
  firstView = { pageIndex: 0,
                pageSize: this.pageSize,
                length: this.length}
  private ElemIndex; // index of clicked element
  ngOnInit() {
    this.backendService.getPrivateImages()
                       .subscribe(pictures =>{this.images = pictures},
                                  err=>{console.log(err)},
                                  ()=>{ this.length = this.images.length
                                        this.updateView(this.firstView)
                                    })
  }
  // pagination logic
  updateView(e:paginator){
    this.showedImages = []
    let start_index = e.pageIndex * e.pageSize
    this.ElemIndex = null
    let length = this.images.length
      for(let i=0; i <= e.pageSize-1; i++){
        let index = start_index + i
        if(index < length)
          this.showedImages.push(this.images[start_index+i])
      }
  }
  addCover(imgURL){
    let info = { _id: this.data._id, imgURL:imgURL}
    this.backendService.addGroupCover(info)
                       .subscribe(data=>{console.log(data)},
                                  err=>{console.log(err)},
                                        ()=>{this.data.imgURL = imgURL
                                            this.dialogRef.close()})
  }
}
