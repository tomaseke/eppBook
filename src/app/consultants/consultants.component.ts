import {Component,  OnInit} from '@angular/core';
import {MainService} from "../main.service";
import {UserModel} from "../user.model";
import {ActivatedRoute} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-consultants',
  templateUrl: './consultants.component.html',
  styleUrls: ['./consultants.component.css']
})
export class ConsultantsComponent implements OnInit {

  filteredConsultants!: UserModel[];
  consultants!: UserModel[];
  name: string = '';
  isLoading: boolean = true;
  isLoggedIn: boolean = false;
  isFilterShown: boolean = false;


  levelOptions = [ '', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  roleOptions = ['','developer', 'smart', 'analytik', 'product manager'];
  seniorityOptions = ['',1,2,3,4,5,6,7,8,9,10];
  technologyOptions = ['javascript', 'html', 'css', 'java', 'nodejs', 'angular'].sort((a, b) => a.localeCompare(b));
  languageOptions = ['english', 'german', 'russian', 'spanish', 'french', 'italian', 'mandarin'].sort((a, b) => a.localeCompare(b));

  constructor(private mainService:MainService, private route:ActivatedRoute) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      if(params['searchTerm']){
        this.consultants = this.mainService.users.filter(consultant => consultant.name.toLowerCase().includes(params['searchTerm'].toLowerCase()));
      }
    });

        this.mainService.fetchUsers().subscribe(res => {
          console.log(res)
          this.consultants = res;
          this.isLoading = false;
          this.isLoggedIn = true;
        })
  }



  search(form: NgForm){
   const technology = form.value.technology;
   const seniority = form.value.seniority;
   const language = form.value.language;
   const level = form.value.level;
   const role = form.value.role;

   this.consultants = this.mainService.filterUsers(technology,Number(seniority),language,level,role);

 }


 toggleFilter(){
    this.isFilterShown = !this.isFilterShown;
 }

}
