import { Injectable } from '@angular/core';
import { GroupInterface } from "./intercafe.enum"
import { Http,
         Response, 
         Headers,
         RequestOptions } from "@angular/http";  
import { Observable } from "rxjs/Rx";
import { environment } from '../environments/environment'
@Injectable()
export class BackendService {

  constructor(private http  : Http) { }
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
  private options = new RequestOptions({ headers: this.headers });
  
  public groups : Array<GroupInterface> = []
  public addToList = false
  createGroup(form_data:GroupInterface){
    let body = JSON.stringify(form_data);
    return this.http.post(environment.createGroup,"data="+body, this.options)
                              .map(this.extractData)
                              .catch(this.handleError);
                              
}
  getGroups(){
    return this.http.get(environment.getGroups)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  deleteGroup(id,folderName){
    return this.http.put(environment.group_delete+'/'+id+'/'+folderName,this.options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  loadGroups(){
    this.getGroups().subscribe(groups => { this.groups = groups},
                                              err =>{ console.log(err)},
                                              ()=>{console.log('groups updated')})
  }
  getGalleries(id){
    return this.http.get(environment.get_gallerys+'/'+id).
                                  map(this.extractData).
                                  catch(this.handleError);
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