import { Component,AfterViewInit, OnInit, ViewChild,ViewEncapsulation,Inject,OnDestroy} from '@angular/core';
import { MatDialog, MatDialogRef,MatTableDataSource, MAT_DIALOG_DATA,MatPaginator} from '@angular/material';
import { BackendService } from '../../backend.service'
import { PictureInterface,GroupInterface, TeamMemberInterfase } from '../../intercafe.enum'
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
export class AddGroupCoverComponent implements OnInit,OnDestroy,AfterViewInit {

  constructor(public dialogRef: MatDialogRef<AddGroupCoverComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private backendService : BackendService) { }
    
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<Element>(true, []);
  displayedColumns = ['select','image', 'size'];
  dataSource = new MatTableDataSource<Element>();// table data
  // private images : PictureInterface[] = []
  private button_color
  // saves item_type of current view
  // ngOnInit sets backendService.item_type to "" for hidding trash icon in menu
  // ngOnDestroy sets backendService.item_type back to previous value
  private item_type 

  private get_privatePictures = ()=>{
    this.backendService.getPrivateImages()
                      .subscribe(pictures =>{
                                    this.dataSource = new MatTableDataSource<Element>(pictures);
                                  },
                                  err=>{console.log(err)},
                                  ()=>{this.dataSource.paginator = this.paginator})
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

 
  selectElement(el){
    this.selection.toggle(el)
    this.backendService.selected_items = this.selection.selected
    console.log(this.selection.selected)
  }
  ngOnInit() {
    this.item_type = this.backendService.item_type
    this.backendService.item_type = ''
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
        this.dataSource = new MatTableDataSource<Element>(pictures)
        
        break;
        //removes group cover
        case 'remove':
        this.button_color = 'warn'
          this.backendService.getOneGroup(this.data.group._id)
                             .subscribe(group=>{
                                this.dataSource = new MatTableDataSource<Element>(group.imgURL);
                              },
                              err=>{console.log(err)},
                              ()=>{this.dataSource.paginator = this.paginator})
          default:
          break;
        }
  }
  ngAfterViewInit(){
    // adds paginator to "member-remove-picture" view
    this.dataSource.paginator = this.paginator
    this.backendService.masterToggleState(this.selection,this.dataSource)
  }
  ngOnDestroy(){
    this.backendService.resetList()
    this.backendService.item_type = this.item_type
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
                                      //  for(let image of this.backendService.selected_items)
                                      //    this.data.group.imgURL = this.images.filter((img:PictureInterface)=>img._id != image._id)
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
                                               .subscribe((user:TeamMemberInterfase)=>{
                                                 for(let member of this.backendService.members){
                                                   if(member._id == user._id){
                                                     member.images = user.images
                                                    return;
                                                   }
                                                 }
                                                //  this.backendService.selected_user.images = user.images; console.log(user)
                                              });
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
