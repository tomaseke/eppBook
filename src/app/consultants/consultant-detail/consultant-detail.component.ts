import { Component, OnInit } from '@angular/core';
import {MainService} from "../../main.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-consultant-detail',
  templateUrl: './consultant-detail.component.html',
  styleUrls: ['./consultant-detail.component.css']
})
export class ConsultantDetailComponent implements OnInit {

  consultant: any;
  id!: number;

  constructor(private mainService: MainService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.consultant = this.mainService.getUserById(this.id);
  }



}
