import { Component, OnInit, ViewEncapsulation,Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { BackendService } from '../../backend.service';
import { TableRow,
         GalerijaInterface,
         GroupInterface,
         PictureInterface,
         TeamMemberInterfase } from '../../intercafe.enum'
import { Router } from '@angular/router'

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DeleteItemComponent implements OnInit {
  
  constructor(public dialogRef: MatDialogRef<DeleteItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public router: Router,
    private backendService : BackendService) { }

    private deleting = null
    private item_name;
    private id_list :any[]
    ngOnInit() {
      //if this modal was open from single item deletion button, then data is provided from
      // "data" variable, otherwise from backendServise.selected_items var
      this.id_list = this.backendService.addToList == true? this.backendService.selected_items : [this.data._id];
      switch (this.backendService.item_type) {
        case 'group':
        this.item_name = this.id_list.length > 1? 'pažymėtas grupes': ' grupę'
          break;
        case 'table':
        this.item_name = this.id_list.length > 1? 'pažymėtas lentelės elementus': ' lentelės elementą'
          break;
        case 'gallery':
        this.item_name = this.id_list.length > 1? 'pažymėtas gallerijas': ' galeriją'
          break;
        case 'private-image':
        this.item_name = this.id_list.length > 1? 'pažymėtas nuotraukas': ' nuotruką'
          break;
        case 'gallery-image':
        this.item_name = this.id_list.length > 1? 'pažymėtas nuotraukas': ' nuotrauką'
          break;
        case 'user-mail-new':
        case  'user-mail-view':
        case 'user-mail-answer':
        case  'user-mail-all':
        this.item_name = this.id_list.length > 1? 'pažymėtas žinutes': ' žinutę'
        break;
        case 'user':
        this.item_name = this.id_list.length > 1? 'pažymėtus vartotojus': ' vartotoją'
          break;
      
        default:
        console.log('no item type provided')
          break;
      }
    }
// after succssesfull deletion run this
// 1 - hides spinner
// 2 - shows snackbar message
// 3 - hides confirm modal
// 4 - resets item list
    private deletionComplete = ()=>{
      this.deleting = false; 
      this.backendService.showSuccessMessage('Ištrinta ('+this.id_list.length+') ','Gerai',3000);
      this.backendService.resetList();
      this.dialogRef.close();
    }
    reload_messages = ()=>{
      this.backendService.getMessages(this.backendService.item_type)
      this.backendService.addToList= false
      this.backendService.selected_items = []
      this.backendService.selection.clear()
    }
    delete_user_mail(){
      let id_list = []
      for(let id of this.id_list)
        id_list.push(id._id)
      console.log(id_list)
      this.backendService.deleteMessages(id_list)
                         .subscribe(data=>{console.log(data)},
                                    err=>{console.log(err)},
                                    ()=>{this.deletionComplete(); 
                                         this.reload_messages()
                                        })
    }
    delete_team_member(){
      this.backendService.deleteMember(this.id_list)
                         .subscribe(data=>{console.log(data)},
                                    err=>{console.log(err)},
                                    ()=>{ this.deletionComplete()
                                          for(let id of this.id_list){
                                            if(this.backendService.selected_user && id == this.backendService.selected_user._id)
                                              this.backendService.selected_user = undefined;
                                            this.backendService.members = this.backendService.members.filter((member:TeamMemberInterfase)=>member._id != id)
                                          }
                                          if(this.backendService.members.length == 0){
                                            this.backendService.selected_user = undefined;
                                            this.router.navigate(['/admin'])
                                          }
                                            })
    }
    delete_group(){
      console.log(this.data)
      this.backendService.deleteGroup(this.id_list)
                         .subscribe(data=>{console.log(data)},
                                    err=>{console.log(err)},
                                    ()=>{ this.deletionComplete()
                                          for(let id of this.id_list)
                                            this.backendService.groups = this.backendService.groups.filter((group:GroupInterface)=>group._id != id)
                                        })
    }
    delete_private_image(){
      this.backendService.deletePrivateImages(this.id_list)
                         .subscribe(data=>{console.log(data)},
                                    err=>{console.log(err)},
                                    ()=>{ this.deletionComplete()
                                          for(let id of this.id_list)
                                            this.backendService.pictures = this.backendService.pictures.filter((picture:PictureInterface)=>picture._id != id)
                                          });
    }
    delete_gallery_image(){
      this.backendService.deleteGalleryImages(this.id_list)
                         .subscribe(data=>{console.log(data)},
                                    err=>{console.log(err)},
                                    ()=>{ this.deletionComplete()
                                          for(let id of this.id_list)
                                            this.backendService.pictures = this.backendService.pictures.filter((picture:PictureInterface)=>picture._id != id)
                                    });
    }
    delete_table_rows(){
      this.backendService.removeTableRow(this.id_list)
                         .subscribe(data=>{console.log(data)},
                                    err=>{console.log(err)},
                                    ()=>{ this.deletionComplete()
                                          for(let id of this.id_list)
                                            this.backendService.table_rows = this.backendService.table_rows.filter((row:TableRow)=>row._id != id)
                                    })
    }
    delete_gallery(){
      this.backendService.deleteGallerys(this.id_list)
                         .subscribe(data=>{console.log(data)},
                                    err=>{console.log(err)},
                                    ()=>{ this.deletionComplete()
                                          for(let id of this.id_list)
                                            this.backendService.gallerys = this.backendService.gallerys.filter((gallery:GalerijaInterface)=>gallery._id != id)
                                          // this.backendService.loadGallerys(this.data.group_id)
                                    });
    }
    confirm(){
      this.deleting = true
      switch (this.backendService.item_type) {
        case 'group':
        this.delete_group()
        console.log('deleting group')
        break;
        case 'private-image':
        this.delete_private_image()
        console.log('deleting private image')
        break;
        case 'gallery-image':
        this.delete_gallery_image()
        console.log('deleting gallery image')
        break;
        case 'table':
        console.log('deleting table rows')
        this.delete_table_rows()
        break;
        case 'gallery':
        console.log('deleting table rows')
        this.delete_gallery()
        break;
        case  'user-mail-new':
        case 'user-mail-view':
        case  'user-mail-answer':
        case   'user-mail-all':
        this.delete_user_mail()
        break;
        case 'user':
        console.log('deleting team member')
        this.delete_team_member()
        break;
        
        default:
          console.log('no or wrong "item_type" was provided')
          console.log('current value is '+this.backendService.item_type)
        break;
      }
  }

}
