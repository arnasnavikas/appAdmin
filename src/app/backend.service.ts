import { Injectable} from '@angular/core';
import { GroupInterface, 
         TeamMemberInterfase,
         GalerijaInterface,
         PictureInterface,
         TableRow, 
         MessagesInterface} from "./intercafe.enum"
import { Http,Response,Headers,RequestOptions } from "@angular/http";  
import { Observable } from "rxjs/Rx";
import { environment } from '../environments/environment'
import { MatSnackBar} from '@angular/material';
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
import { MatTableDataSource} from '@angular/material';
import { SelectionModel} from '@angular/cdk/collections';

@Injectable()
export class BackendService {

  constructor(private http  : Http,public snackBar: MatSnackBar, public authService : AuthService, public router : Router) { }
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  private options = new RequestOptions({ headers: this.headers });
  
  public selected_user :TeamMemberInterfase
  public activeUserIndex;
   
  public dataSource = new MatTableDataSource()
  public selection = new SelectionModel<Element>(true, []);
  
  public groups : Array<GroupInterface> = []
  public gallerys : Array<GalerijaInterface> = []
  public pictures : Array<PictureInterface> = []
  public table_rows : TableRow[] = []
  public members : TeamMemberInterfase[] = []
  public new_messages : MessagesInterface[] = []
  // delete object
  public addToList = false // enables items selecting for deletion
  public selected_items = []  // arry of items _id or other information of selected itemd
  public item_type : string = '' // type for multiple delete
  public selected_DOM_items = [] // holds selected itmes DOM, for removing class after canceling deletion
  //group parmas
  public gallery_id : string = ''
  public group_id : string = ''

  userValidation(){
    if(!this.authService.isAuthenticated()){
      this.router.navigate(['/admin/login']);
      return;
    }
    if(!this.selected_user){
      this.router.navigate(['/admin/select-user'])
      return;
    }
  }
  public showSuccessMessage =(message:string,button_message:string,duration:number)=>{
    this.snackBar.open(message,button_message, {
      duration: duration,
      panelClass: ['blue-snackbar','position-snackbar']
    });
  }
  // adds clicked elemetn information and DOM to list
  _addToList(id,element){
    for(let i of this.selected_items){
      if(id == i){
        let index = this.selected_items.indexOf(id)
        this.selected_items.splice(index,1)
        this.selected_DOM_items.splice(index,1)
        element.className = 'select-item'
        return;
      }
    } 
    this.selected_items.push(id)
    this.selected_DOM_items.push(element)
    element.className += ' selected'
    console.log(this.selected_items )
  }
    // removes all items from "selected_items" && "addToList" var
    public resetList =()=>{
      let exclude_types = ['user-mail-new','user-mail-view','user-mail-answer','user-mail-all']
      for(let type of exclude_types){
        if(this.item_type != type)
          this.selected_items = []
      }
      console.log(this.selected_items)
      this.addToList = false
      for(let i of this.selected_DOM_items)
        i.className ='select-item'
    }
  /**####################################################################
 *             ----USER MAIL ---- FUNCTIONS
 *#####################################################################*/
   /** Selects all rows if they are not all selected; otherwise clear selection. */
   public master_check_state : boolean
   masterToggle() {
    let selected_item = 0
    let source :any = this.dataSource;
    let page_rows = source._renderData._value 
    for(let row of page_rows){
      if(this.selection.isSelected(row))
        selected_item++
    }
    if(selected_item == page_rows.length){
      page_rows.forEach(row => this.selection.deselect(row))
      this.master_check_state = false
    }else{
      this.master_check_state = true
      for(let row of page_rows){
        if(!this.selection.isSelected(row))
          this.selection.select(row)
      }
    }
    this.selected_items = this.selection.selected
  }
  // cheging if master selcetion button must be checked or not;
  // function runs on  paginators  (page) event
  // function used in user-mail component
  public masterToggleState(){
    // timeout is set, becouse paginator page must be initialized before running this function 
    setTimeout(() => {
      let selected_item = 0
      let source :any = this.dataSource; // table data
      let page_rows = source._renderData._value  // table rows that are displayed
      for(let row of page_rows){
        if(this.selection.isSelected(row))
        selected_item++
      }
      console.log('selected items - '+selected_item)
      console.log('row lengt - '+page_rows.length)
      this.master_check_state = selected_item == page_rows.length &&  page_rows.length != 0 ? true: false;
    }, 50);
  }
  // download spcific messages
  public getMessages(type){
    this.masterToggleState()
    switch (type) {
      case 'user-mail-new':
        this.getNewMessages().subscribe(messages=>{
          this.dataSource.data = messages;
          this.new_messages = messages
        })
        break;
      case 'user-mail-view':
        this.getReadedMessages().subscribe(messages=>{
          this.dataSource.data = messages;
        })
        break;
      case 'user-mail-answer':
        this.getReplayedMessages().subscribe(messages=>{
          this.dataSource.data = messages;
        })
        break;
      case 'user-mail-all':
        this.getAllMessages().subscribe(messages=>{
          this.dataSource.data = messages;
        })
        break;
      default:
        break;
    }
  }
/**####################################################################
 *             ----GROUP---- SERVER REQUESTS
 *#####################################################################*/
  createGroup(form_data:GroupInterface){
    let body = JSON.stringify(form_data);
    return this.http.post(environment.createGroup,"data="+body, this.options)
                              .map(this.extractData)
                              .catch(this.handleError);
                              
}
  getGroups(user_id){
    return this.http.get(environment.getGroups+user_id,this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  deleteGroup(id:string[]){
    let body = JSON.stringify(id)
    return this.http.put(environment.group_delete,"data="+body, this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  loadGroups(){
    this.getGroups(this.selected_user._id).subscribe((groups:GroupInterface[]) => { this.groups = groups; console.log(this.groups)},
                                              err =>{ console.log(err)},
                                              ()=>{console.log('groups updated')})
  }
  getOneGroup(group_id:string){
    return this.http.get(environment.getGroups+'/one/'+group_id)
      .map(this.extractData)
      .catch(this.handleError);
  }
  renameGroup(formValue){
    var body = JSON.stringify(formValue);
    return this.http.put(environment.group_rename,'data='+body,this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  changeGroupDecription(formValue){
    var body = JSON.stringify(formValue);
    return this.http.put(environment.addGroupDescription,'data='+body,this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  addGroupCover(group_id){
    var body = JSON.stringify(this.selected_items);
    return this.http.post(environment.addGroupCover+group_id,'data='+body,this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  removeGroupCover(group_id){
    var body = JSON.stringify(this.selected_items);
    return this.http.put(environment.removeGroupCover+group_id,'data='+body,this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
 /**####################################################################
 *             ----GALLERY---- SERVER REQUESTS
 *#####################################################################*/
  getGalleries(group_id){
    return this.http.get(environment.get_gallerys+'/'+group_id).
                                  map(this.extractData).
                                  catch(this.handleError);
  }
  loadGallerys(group_id){
    this.getGalleries(group_id).subscribe(data=>{this.gallerys = data; console.log(data)},
                                    err=>{console.log(err)},
                                    ()=>{console.log('gallerys updated')})
  }
  renameGallery(formData){
    let body = JSON.stringify(formData);
    return this.http.put(environment.renameGalleryURL, "data="+body, this.options)
                                                   .map(this.extractData)
                                                   ._catch(this.handleError);
  } 
  updateGalleryDescription(formData){
    let body = JSON.stringify(formData);
    return this.http.post(environment.addGalleryDescrURL+'/'+formData.id, "data="+body, this.options)
                                                   .map(this.extractData)
                                                   ._catch(this.handleError);
  } 
createGallery(form_data){
  let body = JSON.stringify(form_data);
  return this.http.post(environment.createGalleryURL, "data="+body , this.options)
                            .map(this.extractData)
                            ._catch(this.handleError);
}
deleteGallerys(id:string[]){
  let body = JSON.stringify(id);
  return this.http.post( environment.deleteGalleryUrl, "data="+body, this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
}
/**####################################################################
 *             ----PICTURES---- SERVER REQUESTS
 *#####################################################################*/
getGalleryPictures(gallery_id){
  return this.http.get(environment.getPicturesUrl+gallery_id)
                  .map(this.extractData)
                  .catch(this.handleError);
}
loadGalleryPictures(){
  this.getGalleryPictures(this.gallery_id).subscribe((pictures:PictureInterface[])=>{this.pictures = pictures},
                                                      err=>{console.log(err)},
                                                      ()=>{})
}
deleteGalleryImages(id:string[]){
  let body = JSON.stringify(id)
  return this.http.put(environment.removeGalleryPicture,'data='+body,this.options)
                  .map(this.extractData)
                  .catch(this.handleError)
}
addImageDescription(form_data){
 var body = JSON.stringify(form_data)
 return this.http.put(environment.addPictureDescription,'data='+body,this.options)
                 .map(this.extractData)
                 .catch(this.handleError);
}
getPrivateImages(){
  return this.http.get(environment.upload_pictures+this.selected_user._id,this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
}
loadPrivatePictures(){
  this.getPrivateImages().subscribe(pictures=>{this.pictures = pictures},
    err=>{console.log(err)},
    ()=>{console.log('privte pictures loaded')})
  }
deletePrivateImages(id:string[]){
    let body = JSON.stringify(id)
    return this.http.put(environment.upload_pictures,'data='+body,this.options)
  }
addCoverPicture(picture:PictureInterface){
  console.log('adding gallery cover')
    let body = JSON.stringify(picture)
    return this.http.post(environment.addGalleryCoverUrl,'data='+body,this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
/**####################################################################
 *             ----TABLE---- SERVER REQUESTS
 *#####################################################################*/
addTableRow(group_id){
  return this.http.post( environment.addTableRowUrl+this.selected_user._id+'/'+group_id, this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
}
removeTableRow(row_id:String[]){
  let body = JSON.stringify(row_id)
  return this.http.put( environment.removeTableRowUrl,'data='+body, this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
}
saveTable(tableRow:TableRow[]){
  let body = JSON.stringify(tableRow);
  return this.http.post( environment.saveTableUrl, 'data='+body, this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
}
getTable(group_id){
  return this.http.get(environment.getTableUrl+group_id,this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
}
/**####################################################################
 *             ----USERS---- SERVER REQUESTS
 *#####################################################################*/
addMember(member){
  let body = JSON.stringify(member)
  return this.http.post(environment.createTeamMemberUrl,'data='+body,this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
}
getTeamMembers(){
  return this.http.get(environment.getTeamMemberUrl,this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
}
getOneMember(user_id){
  return this.http.get(environment.getUserUrl+user_id,this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
}
updateMember(user:TeamMemberInterfase){
  let body = JSON.stringify(user);
  return this.http.put(environment.updateTeamMemberUrl,'data='+body,this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
}
updateUserStatus(user:TeamMemberInterfase){
  let body = JSON.stringify(user);
  return this.http.put(environment.updateUserStatusUrl,'data='+body,this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
}
addUserPictures(){
  let body = JSON.stringify(this.selected_items);
  return this.http.post(environment.addUserPicturesUrl+this.selected_user._id,'data='+body,this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
}
removeUserPictures(){
  let body = JSON.stringify(this.selected_items);
  return this.http.put(environment.removeUserPicturesUrl+this.selected_user._id,'data='+body,this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
}
deleteMember(id:string[]){
  let body = JSON.stringify(id)
  return this.http.put(environment.deleteTeamMemberUrl, 'data='+body,this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
}
/**####################################################################
 *             ----MAIL  SERVER REQUESTS---- 
 *#####################################################################*/
getNewMessages(){
  return this.http.get(environment.getNewMessageslUrl+this.selected_user._id,this.options)
                   .map(this.extractData)
                   .catch(this.handleError)
                  }
getAllMessages(){
  return this.http.get(environment.getAllMessageslUrl+this.selected_user._id,this.options)
                   .map(this.extractData)
                   .catch(this.handleError)
                  }
getReadedMessages(){
  return this.http.get(environment.getReadedMessageslUrl+this.selected_user._id,this.options)
                   .map(this.extractData)
                   .catch(this.handleError)
                  }
getReplayedMessages(){
  return this.http.get(environment.getAnsweredMessageslUrl+this.selected_user._id,this.options)
                   .map(this.extractData)
                   .catch(this.handleError)
                  }
getMessage(message_id){
  return this.http.get(environment.getUserMessageUrl+message_id,this.options)
                   .map(this.extractData)
                   .catch(this.handleError)
}
markAsReaded(message_id){
  return this.http.put(environment.markAsReaded+message_id,this.options)
                   .map(this.extractData)
                   .catch(this.handleError)
}
replyMessage(message_form){
  let body = JSON.stringify(message_form)
  return this.http.post(environment.sendMessageUrl,'data='+body,this.options)
                  .map(this.extractData)
                  .catch(this.handleError)
}
deleteMessages(message_id:string[]){
  let body = JSON.stringify(message_id)
  return this.http.put(environment.deleteMessagesUrl,'data='+body,this.options)
                  .map(this.extractData)
                  .catch(this.handleError)
}
 /**####################################################################
 *             ----SERVER RESPONSE FUNCTIONS---- 
 *#####################################################################*/
  // converting response data to json
  private extractData(res: Response) {
    let body = res.json();
    return body || { "error":"nera duomenu"};
  }
  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}