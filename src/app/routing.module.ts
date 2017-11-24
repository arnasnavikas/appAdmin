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
import { PrivateImagesComponent } from './views/private-images/private-images.component'
const routes = [ {path: '', component: AppComponent},
                 {path: 'groups',component: IndexPageComponent,
                      children:[{path:'',component:GroupsComponent},
                                {path:':group_id/:group_folder/:gallery_folder/:gallery_id',component:UploadImagesComponent},
                                {path:':group_id/:gallery_id',component:PrivateImagesComponent},
                                {path:':group_id',component:GallerysComponent}
                              ]},
                 {path: 'upload-images', component: UploadImagesComponent},                
                 {path: 'private-images', component: PrivateImagesComponent},                
                 {path: '**', component: PageNotFoundComponent}                
]
@NgModule({
  imports: [  RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
