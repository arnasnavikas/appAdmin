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
import { AppLoadingComponent } from './views/loding-component/loading-app.component'
import { EditTeamMemberComponent} from './views/edit-team-member/edit-team-member.component'
const routes = [   
                  {path: '',component:AppComponent},
                  {path: 'login',component:LoginComponent},
                  {path: 'loading', component: AppLoadingComponent},
                  {path: 'groups',component:GroupsComponent},
                  {path: 'team-list',component:EditTeamMemberComponent},
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
  imports: [  RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
