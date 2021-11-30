import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ConsultantsComponent } from './consultants/consultants.component';
import {MainService} from "./main.service";
import { ConsultantDetailComponent } from './consultants/consultant-detail/consultant-detail.component';
import {RouterModule, Routes} from "@angular/router";
import { HomepageComponent } from './homepage/homepage.component';
import {FormsModule} from "@angular/forms";
import { FilterPipe } from './filter.pipe';
import { ReversePipe } from './reverse.pipe';
import { SortPipe } from './sort.pipe';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes:Routes = [
  {path: '', component: ConsultantsComponent},
  {path: 'consultant/:id', component: ConsultantDetailComponent},
  {path: 'search/:searchTerm', component: ConsultantsComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConsultantsComponent,
    ConsultantDetailComponent,
    HomepageComponent,
    FilterPipe,
    ReversePipe,
    SortPipe,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    HttpClientModule
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
