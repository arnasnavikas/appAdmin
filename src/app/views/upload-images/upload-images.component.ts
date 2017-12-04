import { Component, OnInit, Input, ViewEncapsulation,ViewChild,AfterViewInit } from '@angular/core';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../../environments/environment'
import { BackendService } from '../../backend.service'
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { AuthService } from '../../auth.service'
interface parameters{
  group_id:string,
  user_folder: string,
  group_folder: string
  gallery_folder: string,
  gallery_id: string,
}
@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UploadImagesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource;
  displayedColumns = ['name', 'size', 'progress','actions'];
  URL : string;
  public uploader:FileUploader ;
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
 
  constructor( private backendService : BackendService,
    private router: ActivatedRoute, public authService : AuthService,
    private _router: Router) {
      let user = this.backendService.selected_user
      if(this.backendService.selected_user && this.authService.isAuthenticated()){

        this.router.params.subscribe((params:parameters)=>{
          if(Object.keys(params).length > 0){
            this.URL = environment.uploadGalleryPicturesUrl+params.user_folder+'/'+params.group_folder+'/'+params.gallery_folder+'/'+user._id+'/'+params.gallery_id;
            console.log('gallerys images uploading')
          }
          else{
            this.URL = environment.upload_pictures+user.folder_name+'/'+user._id;
            console.log(this.URL)
          }
        })
      }else
        this._router.navigate(['/admin/select-user'])
    }
    ngOnInit() {
      this.uploader = new FileUploader({ url: this.URL,
          maxFileSize:5000000,
          queueLimit:20});
      }
      public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
      }
      public fileOverAnother(e:any):void {
        this.hasAnotherDropZoneOver = e;
      }
      setPaginator = ()=>{
        this.dataSource.paginator = this.paginator;
      }
      makeTable(){
        this.dataSource = new MatTableDataSource(this.uploader.queue);
        setTimeout(this.setPaginator,1000) 
      }
      public select(e:any):void{
        this.makeTable()
      }

}
