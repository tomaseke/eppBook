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

const routes:Routes = [
  {path: '', component: ConsultantsComponent},
  {path: 'consultant/:id', component: ConsultantDetailComponent},
  {path: 'search/:searchTerm', component: ConsultantsComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConsultantsComponent,
    ConsultantDetailComponent,
    HomepageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
