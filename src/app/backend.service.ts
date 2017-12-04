import { Injectable, group } from '@angular/core';
import { GroupInterface, TeamMemberInterfase ,GalerijaInterface,PictureInterface,TableRow } from "./intercafe.enum"
import { Http,Response,Headers,RequestOptions } from "@angular/http";  
import { Observable } from "rxjs/Rx";
import { environment } from '../environments/environment'
import { PictureGalleryComponent } from './views/picture-gallery/picture-gallery.component';
import { MatSnackBar} from '@angular/material';
import { AddMemberComponent } from './modals/add-member/add-member.component';
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
@Injectable()
export class BackendService {

  constructor(private http  : Http,public snackBar: MatSnackBar, public authService : AuthService, public router : Router) { }
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  private options = new RequestOptions({ headers: this.headers });
  
  public selected_user :TeamMemberInterfase

  public groups : Array<GroupInterface> = []
  public gallerys : Array<GalerijaInterface> = []
  public pictures : Array<PictureInterface> = []
  public table_rows : TableRow[]
  public members : TeamMemberInterfase[] = []
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
      this.router.navigate(['/login']);
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
      panelClass: 'blue-snackbar'
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
  public resetList =()=>{
    this.selected_items = []
    this.addToList = false
    for(let i of this.selected_DOM_items)
      i.className ='select-item'
  }
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
  /**####################################################################
 *  DESCRIPTION:
 *        rename gallery in server database;
 *  PARAMETERS: 
 *        1. form_data { pavadinimas : 'data',
 *                       _id    : 'data',
 *                       route   : 'nasm_sad_' }
 *#####################################################################*/
  renameGroup(formValue){
    var body = JSON.stringify(formValue);
    return this.http.put(environment.group_rename,'data='+body,this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  /**####################################################################
 *  DESCRIPTION:
 *        change group description in server database;
 *  PARAMETERS: 
 *        1. form_data { _id    : 'data',
 *                       description: 'nasm_sad_' }
 *#####################################################################*/
  changeGroupDecription(formValue){
    var body = JSON.stringify(formValue);
    return this.http.put(environment.addGroupDescription,'data='+body,this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  /**####################################################################
 *  DESCRIPTION:
 *        rename gallery in server database;
 *  PARAMETERS: 
 *        1. form_data {  _id    : 'data' }
 *#####################################################################*/
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

  /**####################################################################
 *  DESCRIPTION:
 *        rename gallery in server database;
 *  PARAMETERS: 
 *        1. form_data { name : 'data',
 *                       id    : 'data',
 *                       routeName   : 'nasm_sad_' }
 *#####################################################################*/
  renameGallery(formData){
    let body = JSON.stringify(formData);
    return this.http.put(environment.renameGalleryURL, "data="+body, this.options)
                                                   .map(this.extractData)
                                                   ._catch(this.handleError);
  } 
  /**####################################################################
 *  DESCRIPTION:
 *        rename gallery in server database;
 *  PARAMETERS: 
 *        1. form_data {id    : 'data',
 *                      description   : 'nasm_sad_' }
 *#####################################################################*/
  updateGalleryDescription(formData){
    let body = JSON.stringify(formData);
    return this.http.post(environment.addGalleryDescrURL+'/'+formData.id, "data="+body, this.options)
                                                   .map(this.extractData)
                                                   ._catch(this.handleError);
  } 
  /**####################################################################
 *  DESCRIPTION:
 *        Create new folder in _url server;
 *  PARAMETERS: 
 *        1. form_data - object - { gallery_name : 'data',
 *                                  aprasymas    : 'data',
 *                                  route_name   : 'nasm_sad_',
 *                                  group_name   : 'asd-asd',
 *                                  group_id     : 'asd-asd',
 *                                  folder_name  : 'asdasd'
 *                                 }
 *#####################################################################*/
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
getGalleryPictures(gallery_id){
  return this.http.get(environment.getPicturesUrl+gallery_id)
                  .map(this.extractData)
                  .catch(this.handleError);
}
loadGalleryPictures(){
  this.getGalleryPictures(this.gallery_id).subscribe((pictures:Array<PictureInterface>)=>{this.pictures = pictures},
                                                      err=>{console.log(err)},
                                                      ()=>{})
}

deleteGalleryImages(id:string[]){
  let body = JSON.stringify(id)
  return this.http.put(environment.removeGalleryPicture,'data='+body,this.options)
                  .map(this.extractData)
                  .catch(this.handleError)
}
/**####################################################################
 *  DESCRIPTION:
 *        add description to picture;
 *  PARAMETERS: 
 *        1. form_data {id    : 'data',
 *                      description   : 'nasm_sad_' }
 *#####################################################################*/
  
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
/************************* TABLE FUNCTIONS ********************* */
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

/************************* MEMBERS ********************* */
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
updateMember(member:TeamMemberInterfase){
  let body = JSON.stringify(member);
  return this.http.put(environment.updateTeamMemberUrl,'data='+body,this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
}
deleteMember(id:string[]){
  let body = JSON.stringify(id)
  return this.http.put(environment.deleteTeamMemberUrl, 'data='+body,this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
}
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