import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ConsultantsComponent } from './consultants/consultants.component';
import {MainService} from "./main.service";
import { ConsultantDetailComponent } from './consultants/consultant-detail/consultant-detail.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FilterPipe } from './filter.pipe';
import { ReversePipe } from './reverse.pipe';
import { SortPipe } from './sort.pipe';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { ConsultantEditComponent } from './consultants/consultant-edit/consultant-edit.component';

const routes:Routes = [
  {path: 'consultant/:id', component: ConsultantDetailComponent},
  {path: 'search/:searchTerm', component: ConsultantsComponent},
  {path: 'consultants', component: ConsultantsComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'home', component: HomeComponent},
  {path: 'consultant/:id/edit', component: ConsultantEditComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConsultantsComponent,
    ConsultantDetailComponent,
    FilterPipe,
    ReversePipe,
    SortPipe,
    LoginComponent,
    SignupComponent,
    LogoutComponent,
    HomeComponent,
    ConsultantEditComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
