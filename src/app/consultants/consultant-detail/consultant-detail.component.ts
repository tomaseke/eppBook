import { Component } from '@angular/core';
import {MainService} from "../../main.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-consultant-detail',
  templateUrl: './consultant-detail.component.html',
  styleUrls: ['./consultant-detail.component.css']
})
export class ConsultantDetailComponent{

  consultant: any;
  id!: number;
  isLoading: boolean = true;
  isValidUser!: boolean;

  constructor(private mainService: MainService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.mainService.fetchUsers().subscribe(res => {
      if(res[0].find((user: any) => user.id === Number(this.id))){
        this.consultant = res[0].find((user: any) => user.id === Number(this.id));
        this.isValidUser = true;
      }
      else{
        this.isValidUser = false;
      }
      this.isLoading = false;

    })
  }



}
