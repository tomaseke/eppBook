import {Component, OnDestroy} from '@angular/core';
import {MainService} from "../../main.service";
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs";

@Component({
  selector: 'app-consultant-detail',
  templateUrl: './consultant-detail.component.html',
  styleUrls: ['./consultant-detail.component.css']
})
export class ConsultantDetailComponent {

  consultant: any;
  id!: number;
  isLoading: boolean = true;
  isValidUser!: boolean;

  constructor(private mainService: MainService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.mainService.fetchUsers().subscribe(res => {
      if(res.find((user: any) => user.id === Number(this.id))){
        this.consultant = res.find((user: any) => user.id === Number(this.id));
        this.isValidUser = true;
      }
      else{
        this.isValidUser = false;
      }
      this.isLoading = false;

    })
  }

  deleteUser(){
    this.mainService.deleteUser(this.id);
  }



}
