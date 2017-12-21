// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import { RoutingModule } from "./routing.module";
import { HttpModule} from '@angular/http';
import { FlexLayoutModule} from "@angular/flex-layout";
import { MaterialModule } from './material.module'
import { FileUploadModule } from 'ng2-file-upload'
//services
import { BackendService } from './backend.service'
import { AuthService } from './auth.service'
// pipes
import { DatePipe } from '@angular/common';
import { SafePipe } from './pipes/safe-pipe.pipe';
import { FileSizePipe } from './pipes/bytes-to-larger.pipe';

  //views
import { AppComponent } from './views/root-component/app.component';
import { GroupsComponent } from './views/groups/groups.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component'
import { GallerysComponent } from './views/gallerys/gallerys.component';
  //modals
import { AddGroupCoverComponent } from './modals/add-group-cover/add-group-cover.component';
import { NewItemComponent } from './modals/new-item/new-item.component';
import { DeleteItemComponent } from './modals/delete-item/delete-item.component';
import { AddDescriptionComponent } from './modals/add-description/add-description.component';
import { RenameComponent } from './modals/rename/rename.component';
//directives
import { AddItemDirective } from './directives/add-item.directive';
import { HighLightTextDirective} from './directives/highlight-text.directive'
import { DeleteItemDirective} from './directives/delete-item.directive'
//components
import { UploadImagesComponent } from './views/upload-images/upload-images.component';
import { PrivateImagesComponent } from './views/private-images/private-images.component';
import { PictureGalleryComponent } from './views/picture-gallery/picture-gallery.component';
import { TableEditComponent } from './views/table-edit/table-edit.component';
import { TableViewComponent } from './views/table-view/table-view.component';
import { LoginComponent } from './views/login/login.component';
import { MenuBarComponent } from './views/menu-bar/menu-bar.component';
import { AppLoadingComponent} from './views/loding-component/loading-app.component';
import { StatusComponent } from './modals/status/status.component';
import { AddMemberComponent } from './modals/add-member/add-member.component';
import { EditTeamMemberComponent } from './views/edit-team-member/edit-team-member.component';
import { UserMailComponent } from './views/user-mail/user-mail.component';
import { ReplyMessageComponent } from './views/reply-message/reply-message.component'
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
    MenuBarComponent,
    FileSizePipe,
    RenameComponent,
    PrivateImagesComponent,
    AddGroupCoverComponent,
    PictureGalleryComponent,
    AddItemDirective,
    TableEditComponent,
    TableViewComponent,
    SafePipe,
    HighLightTextDirective,
    DeleteItemDirective,
    LoginComponent,
    AppLoadingComponent,
    StatusComponent,
    AddMemberComponent,
    EditTeamMemberComponent,
    UserMailComponent,
    ReplyMessageComponent
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
  providers: [BackendService,AuthService],
    entryComponents:[ NewItemComponent,
                      DeleteItemComponent,
                      AddDescriptionComponent,
                      RenameComponent,
                      AddGroupCoverComponent,
                      StatusComponent,
                      AddMemberComponent
                      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
