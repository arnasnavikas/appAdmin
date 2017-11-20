import { Component, OnInit, Input, ViewEncapsulation,ViewChild,AfterViewInit } from '@angular/core';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../../environments/environment'
import { BackendService } from '../../backend.service'
import { ActivatedRoute, Router } from '@angular/router';
import {MatPaginator, MatTableDataSource} from '@angular/material';
interface Element {
  name: string;
  size: number;
  isSuccess:boolean,
  isCancel:boolean,
  isError:boolean,
  progress: number;
  item: any
}
@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UploadImagesComponent implements OnInit,AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ELEMENT_DATA: Array<Element> = []
  dataSource;
  displayedColumns = ['name', 'size', 'progress','actions'];
  URL : string;
  public uploader:FileUploader ;
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  
  constructor( private backendService : BackendService,
    private router: ActivatedRoute,
    private _router: Router) {}
    ngOnInit() {
      this.router.params.subscribe(params=>{
        console.log(params);
        if(Object.keys(params).length > 0)
        this.URL = environment.addPictureUrl+this.backendService.group_id+'/'+params['folder']+'/'+params['id'];
        else
        this.URL = environment.upload_pictures;
        this.uploader = new FileUploader({ url: this.URL,
          maxFileSize:50000000,
          queueLimit:20});
        });
      }
      openFile(domEl) {
        
        console.log(domEl)
      }
      public fileOverBase(e:any):void {
        this.hasBaseDropZoneOver = e;
      }
      public fileOverAnother(e:any):void {
        this.hasAnotherDropZoneOver = e;
      }
      
      makeTable(){
        this.ELEMENT_DATA = []
        for(let i=0; i<this.uploader.queue.length; i++){
          console.log(this.uploader.queue.length)
          console.log('looping '+ i)
          let obj: any = {} 
          obj['name'] = this.uploader.queue[i]._file.name
          obj['progress'] = this.uploader.queue[i].progress
          obj['size'] = this.uploader.queue[i]._file.size
          obj['isCancel'] = this.uploader.queue[i].isCancel
          obj['isSuccess'] = this.uploader.queue[i].isSuccess
          obj['isError'] = this.uploader.queue[i].isError
          obj['item'] = this.uploader.queue[i]
          this.ELEMENT_DATA.push(obj)
          if(i<this.uploader.queue.length){
            this.dataSource = new MatTableDataSource<Element>(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
            console.log(this.ELEMENT_DATA)
          }
        }
      }
      public select(e:any):void{
        this.makeTable()
      }

}
