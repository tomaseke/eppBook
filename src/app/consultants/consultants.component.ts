import { Component, OnInit } from '@angular/core';
import {MainService} from "../main.service";
import {UserModel} from "../user.model";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-consultants',
  templateUrl: './consultants.component.html',
  styleUrls: ['./consultants.component.css']
})
export class ConsultantsComponent implements OnInit {

  consultants!: UserModel[];
  name: string = '';
  isLoading: boolean = true;
  isLoggedIn: boolean = false;


  levelOptions = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  roleOptions = ['developer', 'smart', 'analytik', 'product manager']

  constructor(private mainService:MainService, private route:ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['searchTerm']){
        this.consultants = this.mainService.users.filter(consultant => consultant.name.toLowerCase().includes(params['searchTerm'].toLowerCase()));
      }
    });

    this.authService.user.subscribe(res => {
      if(res){
        this.mainService.fetchUsers().subscribe(res => {
          this.consultants = res;
          this.isLoading = false;
          this.isLoggedIn = true;
        })
      }
    })
  }


 search(form: NgForm){
   const technology = form.value.technology;
   const seniority = form.value.seniority;
   const language = form.value.language;
   const level = form.value.level;
   const role = form.value.role;


   // @ts-ignore
   this.consultants = this.mainService.filterUsers(technology,seniority,language,level,role);

 }


}
