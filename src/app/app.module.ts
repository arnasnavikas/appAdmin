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
import { NewItemComponent } from './modals/new-item/new-item.component';
import { DeleteItemComponent } from './modals/delete-item/delete-item.component';
import { AddDescriptionComponent } from './modals/add-description/add-description.component';
import { UploadImagesComponent } from './views/upload-images/upload-images.component';
import { IndexPageComponent } from './views/index-page/index-page.component';
import { FileSizePipe } from './pipes/bytes-to-larger.pipe';
import { RenameComponent } from './modals/rename/rename.component';
import { PrivateImagesComponent } from './views/private-images/private-images.component';
import { AddGroupCoverComponent } from './modals/add-group-cover/add-group-cover.component';
import { PictureGalleryComponent } from './views/picture-gallery/picture-gallery.component';
import { DeleteItemDirective } from './directives/delete-item.directive';
import { TableEditComponent } from './views/table-edit/table-edit.component';
import { TableViewComponent } from './views/table-view/table-view.component';
import { SafePipe } from './pipes/safe-pipe.pipe';
@NgModule({
  declarations: [
    AppComponent,
    GroupsComponent,
    PageNotFoundComponent,
    NewItemComponent,
    DeleteItemComponent,
    GallerysComponent,
    AddDescriptionComponent,
    UploadImagesComponent,
    IndexPageComponent,
    FileSizePipe,
    RenameComponent,
    PrivateImagesComponent,
    AddGroupCoverComponent,
    PictureGalleryComponent,
    DeleteItemDirective,
    TableEditComponent,
    TableViewComponent,
    SafePipe
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
    entryComponents:[ NewItemComponent,
                      DeleteItemComponent,
                      AddDescriptionComponent,
                      RenameComponent,
                      AddGroupCoverComponent,
                      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
