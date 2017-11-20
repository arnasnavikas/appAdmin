import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BackendService } from './backend.service'
import { FormsModule, ReactiveFormsModule} from '@angular/forms'; 
import { RoutingModule } from "./routing.module";
import { HttpModule} from '@angular/http';
import { FlexLayoutModule} from "@angular/flex-layout";
import { MaterialModule } from '../../../myApp/src/app/material components/material.module'
// pipes
import { DatePipe } from '@angular/common';
//components
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component'
import { NewGroupComponent } from './modals/new-group/new-group.component';
import { DeleteGroupComponent } from './modals/delete-group/delete-group.component';
import { NewGalleryComponent } from './modals/new-gallery/new-gallery.component';
import { GallerysComponent } from './views/gallerys/gallerys.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    NewGroupComponent,
    DeleteGroupComponent,
    NewGalleryComponent,
    GallerysComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    RoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [BackendService],
    entryComponents:[ NewGroupComponent,
                      DeleteGroupComponent,
                      NewGalleryComponent,
                      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
