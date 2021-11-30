import { Component, OnInit } from '@angular/core';
import {MainService} from "../main.service";
import {UserModel} from "../user.model";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-consultants',
  templateUrl: './consultants.component.html',
  styleUrls: ['./consultants.component.css']
})
export class ConsultantsComponent implements OnInit {

  consultants!: UserModel[];
  name: string = '';
  loading: boolean = true;

  constructor(private mainService:MainService, private route:ActivatedRoute, private http: HttpClient) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['searchTerm']){
        this.consultants = this.mainService.users.filter(consultant => consultant.name.toLowerCase().includes(params['searchTerm'].toLowerCase()));
      }
    });

    this.mainService.fetchUsers().subscribe( res => {
      this.consultants = res[0];
      this.loading = false;
    })
  }


 search(form: NgForm){
    this.consultants = this.mainService.getUsersByTechnology(form.value.technology);
 }

  testHttp(){

  }



}
