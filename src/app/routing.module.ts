import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// components
import { GroupsComponent } from './views/groups/groups.component'
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component'
import { GallerysComponent } from './views/gallerys/gallerys.component'
import { AppComponent } from './views/root-component/app.component'
import { UploadImagesComponent } from './views/upload-images/upload-images.component'
import { PrivateImagesComponent } from './views/private-images/private-images.component'
import { TableEditComponent } from './views/table-edit/table-edit.component'
import { TableViewComponent } from './views/table-view/table-view.component'
import { LoginComponent } from './views/login/login.component'
// const routes = [ {path: '', component: LoginComponent},
//                  {path: 'groups',component: IndexPageComponent,
//                       children:[{path:'',component:GroupsComponent},
//                                 {path:':group_id/:group_folder/:gallery_folder/:gallery_id',component:UploadImagesComponent},
//                                 {path:'edit-table/:group_id',component:TableEditComponent},
//                                 {path:'view-table/:group_id',component:TableViewComponent},
//                                 {path:':group_id/:gallery_id',component:PrivateImagesComponent},
//                                 {path:':group_id',component:GallerysComponent},
//                               ]},
//                  {path: 'upload-images', component: UploadImagesComponent},                
//                  {path: 'private-images', component: PrivateImagesComponent},                
//                  {path: '**', component: PageNotFoundComponent}                
// ]
const routes = [ {path: '', component: LoginComponent},
                  {path: 'welcome',component:AppComponent},
                  {path: 'groups',component:GroupsComponent},
                  {path: 'groups/:group_id/:group_folder/:gallery_folder/:gallery_id',component:UploadImagesComponent},
                  {path: 'groups/edit-table/:group_id',component:TableEditComponent},
                  {path: 'groups/view-table/:group_id',component:TableViewComponent},
                  {path: 'groups/:group_id/:gallery_id',component:PrivateImagesComponent},
                  {path: 'groups/:group_id',component:GallerysComponent},
                  {path: 'upload-images', component: UploadImagesComponent},                
                  {path: 'private-images', component: PrivateImagesComponent},                
                  {path: '**', component: PageNotFoundComponent}                
]
@NgModule({
  imports: [  RouterModule.forRoot(routes,{ useHash: true }),
    CommonModule
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
