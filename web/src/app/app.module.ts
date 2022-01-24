import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorHandlerService } from './error-handler.service';
import { UserAuthService } from './service/user-auth.service';

import { AppRoutingModule } from './app-routing.module';
import { PangNotFoundComponent } from './mycomponent/pang-not-found/pang-not-found.component';
import { AppComponent } from './app.component';
import { SidebarComponent } from './mycomponent/sidebar/sidebar.component';
import { HomeComponent } from './mycomponent/home/home.component';
import { LoginComponent } from './mycomponent/login/login.component';
import { UserListComponent } from './mycomponent/user-list/user-list.component';
import { BottombarComponent } from './mycomponent/bottombar/bottombar.component';
import { TableComponent } from './mycomponent/table/table.component';
import { TableeditComponent } from './mycomponent/table/tableedit/tableedit.component';
import { AddTableComponent } from './mycomponent/table/add-table/add-table.component';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    LoginComponent,
    UserListComponent,
    BottombarComponent,
    TableComponent,
    TableeditComponent,
    PangNotFoundComponent,
    AddTableComponent
  ],
  imports: [
    BrowserModule,  
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,  
  ],
  providers: [
    UserAuthService,
    ErrorHandlerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
