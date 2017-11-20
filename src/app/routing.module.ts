import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// components
import { GroupsComponent } from './views/groups/groups.component'
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component'
import { GallerysComponent } from './views/gallerys/gallerys.component'
import { AppComponent } from './views/home-page/app.component'
import { UploadImagesComponent } from './views/upload-images/upload-images.component'
import { IndexPageComponent } from './views/index-page/index-page.component'
const routes = [ {path: '', component: AppComponent},
                 {path: 'groups',component: IndexPageComponent,
                      children:[{path:'',component:GroupsComponent},
                      {path:':group/:id/:gallery_id',component:UploadImagesComponent},
                      {path:':group/:id',component:GallerysComponent}
                              ]},
                 {path: '**', component: PageNotFoundComponent}                
]
@NgModule({
  imports: [  RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
