import { Component,AfterViewInit, OnInit, ViewChild,ViewEncapsulation,Inject,OnDestroy} from '@angular/core';
import { MatDialogRef,MatTableDataSource, MAT_DIALOG_DATA,MatPaginator} from '@angular/material';
import { BackendService } from '../../backend.service'
import { PictureInterface,GroupInterface, TeamMemberInterfase } from '../../intercafe.enum'
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
    public backendService : BackendService) { }
    
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = ['select','image', 'size'];
  // private images : PictureInterface[] = []
  public button_color
  // saves item_type of current view
  // ngOnInit sets backendService.item_type to "" for hidding trash icon in menu
  // ngOnDestroy sets backendService.item_type back to previous value
  private item_type 

  private get_private_pictures = ()=>{
    this.backendService.getPrivateImages()
                       .subscribe(pictures =>{
                                    this.backendService.dataSource.data = pictures;
                                    this.backendService.masterToggleState()
                                  },
                                  err=>{console.log(err)},
                                  ()=>{})
  }
  private get_group_pictures =() =>{
    this.backendService.getOneGroup(this.data.group._id)
                       .subscribe(group=>{
                          this.backendService.dataSource.data = group.imgURL;
                          this.backendService.masterToggleState()
                        },
                        err=>{console.log(err)},
                        ()=>{})
  }
  selectElement(el){
    this.backendService.selection.toggle(el)
    this.backendService.selected_items = this.backendService.selection.selected
  }
  ngOnInit() {
    this.item_type = this.backendService.item_type
    this.backendService.item_type = ''
    switch (this.data.type) {
        case 'add':
        case 'member-add-picture':
        this.button_color = 'primary'
        this.get_private_pictures()
        console.log('adding picture to member or group cover')
        break;
        case 'member-remove-picture':
        this.button_color = 'warn'
        console.log('removing picture from member')
        this.backendService.dataSource.data =  this.backendService.selected_user.images
        this.backendService.masterToggleState()
        break;
        //removes group cover
        case 'remove':
        this.button_color = 'warn'
        this.get_group_pictures()
          default:
          console.log('no match case')
          break;
        }
  }
  ngAfterViewInit(){
    // adds paginator to "member-remove-picture" view
    this.backendService.dataSource.paginator = this.paginator
    // this.backendService.masterToggleState()
  }
  ngOnDestroy(){
    this.backendService.resetList()
    this.backendService.selection.clear()
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
