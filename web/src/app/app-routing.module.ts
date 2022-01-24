import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsCheckLoginGuard } from './guard/is-check-login.guard';
import { IsCheckNotLoginGuard } from './guard/is-check-not-login.guard';

import { HomeComponent } from './mycomponent/home/home.component';
import { UserListComponent } from './mycomponent/user-list/user-list.component';
import { LoginComponent } from './mycomponent/login/login.component';
import { TableComponent } from './mycomponent/table/table.component';
import { TableeditComponent } from './mycomponent/table/tableedit/tableedit.component';
import { PangNotFoundComponent } from './mycomponent/pang-not-found/pang-not-found.component';
import { AddTableComponent } from './mycomponent/table/add-table/add-table.component';


const routes: Routes = [

  {path: 'login', component:LoginComponent, canActivate:[IsCheckNotLoginGuard]},
  {path: 'user-list', component: UserListComponent, canActivate:[IsCheckLoginGuard]},
  {path: 'dashboard', component:HomeComponent, pathMatch: 'full', canActivate:[IsCheckLoginGuard]},

  {path: 'table', canActivate:[IsCheckLoginGuard], 
      children: [
              {path: '', component: TableComponent, pathMatch: 'full'}, 
              {path: 'create', component: AddTableComponent},
              {path: ':id', component: TableeditComponent},
      ]
  },

  {path: '**', component: PangNotFoundComponent }
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
