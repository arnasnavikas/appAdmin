import { Component, OnInit, ViewChild,ViewEncapsulation,Inject,OnDestroy} from '@angular/core';
import { MatDialog, MatDialogRef,MatTableDataSource, MAT_DIALOG_DATA,MatPaginator} from '@angular/material';
import { BackendService } from '../../backend.service'
import { PictureInterface,GroupInterface } from '../../intercafe.enum'
import { DeleteItemComponent} from '../../modals/delete-item/delete-item.component'
import { SelectionModel} from '@angular/cdk/collections';
import { Element } from '@angular/compiler';

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
    
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<Element>(true, []);
  displayedColumns = ['select','image', 'size'];
  dataSource // table data
  private images : Array<PictureInterface> = []
  private showedImages = []
  length;
  pageSize = 5  ;
  pageSizeOptions = [5, 10, 25, 100];
  private button_color
  firstView = { pageIndex: 0,
                pageSize: this.pageSize,
                length: this.length}
  private get_privatePictures = ()=>{
    this.backendService.getPrivateImages()
                      .subscribe(pictures =>{
                                    this.dataSource = new MatTableDataSource<Element>(pictures);
                                    this.dataSource.paginator = this.paginator
                                  },
                                  err=>{console.log(err)},
                                  ()=>{})
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  selectElement(el){
    this.selection.toggle(el)
    this.backendService.selected_items = this.selection.selected
    console.log(this.selection.selected)
  }
  ngOnInit() {
    switch (this.data.type) {
        case 'add':
        this.button_color = 'primary'
        this.get_privatePictures()
        break;
        case 'member-add-picture':
        this.button_color = 'primary'
        console.log('adding picture to member')
        this.get_privatePictures()
        break;
        case 'member-remove-picture':
        this.button_color = 'warn'
        console.log('removing picture from member')
        let pictures : any = this.backendService.selected_user.images
        this.dataSource = new MatTableDataSource<Element>(pictures);
        this.dataSource.paginator = this.paginator
        break;
        //removes group cover
        case 'remove':
        this.button_color = 'warn'
          this.backendService.getOneGroup(this.data.group._id)
                             .subscribe(group=>{
                                this.dataSource = new MatTableDataSource<Element>(group.imgURL);
                                this.dataSource.paginator = this.paginator
                             })
      default:
        break;
    }
  }
  ngOnDestroy(){
    this.backendService.resetList()
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
                                         this.data.group.imgURL = this.images.filter((img:PictureInterface)=>img._id != image._id)
                                        this.backendService.showSuccessMessage('Nuotraukos ištrintos','',3000);
                                        this.backendService.resetList()
                                       });
        break;
        case 'member-add-picture':
        this.backendService.addUserPictures()
                           .subscribe(data=>{console.log(data); 
                            for(let image of this.backendService.selected_items)
                              this.backendService.selected_user.images.push(image);
                            },
                           err=>{console.log(err)},
                           ()=>{

                              this.backendService.showSuccessMessage('Nuotraukos pridėtos','',3000);
                              this.backendService.resetList()
                             });
        break;                             
        case 'member-remove-picture':
        this.backendService.removeUserPictures()
                           .subscribe(data=>{console.log(data)},
                           err=>{console.log(err)},
                           ()=>{
                            this.backendService.getOneMember(this.backendService.selected_user._id)
                                               .subscribe(user=>{this.backendService.selected_user.images = user.images; console.log(user)});
                              this.backendService.showSuccessMessage('Nuotraukos ištrintos','',3000);
                              this.backendService.resetList()
                             });
        break;                             
        default:
        break;
      }
      this.dialogRef.close()
  }
}
