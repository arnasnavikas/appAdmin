import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
// components
import { HomeComponent } from './views/home/home.component'
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component'
import { GallerysComponent } from './views/gallerys/gallerys.component'
import { AppComponent } from './app.component'

const routes = [ {path: '', component: AppComponent},
                 {path: 'groups',component: HomeComponent},
                 {path:'groups/:group/galleries/:id', component: GallerysComponent },
                 {path: '**', component: PageNotFoundComponent}                
]
@NgModule({
  imports: [  RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
