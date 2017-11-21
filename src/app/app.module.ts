// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BackendService } from './backend.service'
import { FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import { RoutingModule } from "./routing.module";
import { HttpModule} from '@angular/http';
import { FlexLayoutModule} from "@angular/flex-layout";
import { MaterialModule } from '../../../myApp/src/app/material components/material.module'
import { FileUploadModule } from 'ng2-file-upload'
// pipes
import { DatePipe } from '@angular/common';
//components
  //views
import { AppComponent } from './views/home-page/app.component';
import { GroupsComponent } from './views/groups/groups.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component'
import { GallerysComponent } from './views/gallerys/gallerys.component';
  //modals
import { NewGroupComponent } from './modals/new-group/new-group.component';
import { DeleteGroupComponent } from './modals/delete-group/delete-group.component';
import { NewGalleryComponent } from './modals/new-gallery/new-gallery.component';
import { RenameGalleryComponent } from './modals/rename-gallery/rename-gallery.component';
import { GalleryDescriptionComponent } from './modals/gallery-description/gallery-description.component';
import { UploadImagesComponent } from './views/upload-images/upload-images.component';
import { IndexPageComponent } from './views/index-page/index-page.component';
import { FileSizePipe } from './pipes/bytes-to-larger.pipe';
import { RenameGroupComponent } from './modals/rename-group/rename-group.component';
import { PrivateImagesComponent } from './views/private-images/private-images.component';
@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    PageNotFoundComponent,
    NewGroupComponent,
    DeleteGroupComponent,
    NewGalleryComponent,
    GallerysComponent,
    RenameGalleryComponent,
    GalleryDescriptionComponent,
    UploadImagesComponent,
    IndexPageComponent,
    FileSizePipe,
    RenameGroupComponent,
    PrivateImagesComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FileUploadModule
  ],
  providers: [BackendService],
    entryComponents:[ NewGroupComponent,
                      DeleteGroupComponent,
                      NewGalleryComponent,
                      RenameGalleryComponent,
                      GalleryDescriptionComponent,
                      RenameGroupComponent
                      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
