import { Component, OnInit } from '@angular/core';
import {MainService} from "../main.service";
import {UserModel} from "../user.model";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-consultants',
  templateUrl: './consultants.component.html',
  styleUrls: ['./consultants.component.css']
})
export class ConsultantsComponent implements OnInit {

  consultants!: UserModel[];
  searchTerm: string = '';

  constructor(private mainService:MainService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.consultants = this.mainService.users;
    this.route.params.subscribe(params => {
      if(params['searchTerm']){
        this.consultants = this.mainService.users.filter(consultant => consultant.name.toLowerCase().includes(params['searchTerm'].toLowerCase()));
      }
    })
  }

 updateInput(e: any){
  this.searchTerm = e.target.value;
  this.consultants = this.mainService.users.filter(consultant => consultant.name.toLowerCase().includes(this.searchTerm.toLowerCase()));
 }

}
