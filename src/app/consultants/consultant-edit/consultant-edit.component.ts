import { Component, OnInit } from '@angular/core';
import {MainService} from "../../main.service";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {UserModel} from "../../user.model";

@Component({
  selector: 'app-consultant-edit',
  templateUrl: './consultant-edit.component.html',
  styleUrls: ['./consultant-edit.component.css']
})
export class ConsultantEditComponent implements OnInit {


  consultant!: UserModel;
  id!: number;
  isLoading: boolean = true;
  isValidUser!: boolean;
  userForm!: FormGroup;

  levelOptions = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  roleOptions = ['developer', 'smart', 'analytik', 'product manager'];
  seniorityOptions = [1,2,3,4,5,6,7,8,9,10];


  constructor(private mainService: MainService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.mainService.fetchUsers().subscribe(res => {
      if(res.find((user: any) => user.id === Number(this.id))){
        this.consultant = res.find((user: any) => user.id === Number(this.id));
        this.isValidUser = true;
        this.initForm();
      }
      else{
        this.isValidUser = false;
      }
      this.isLoading = false;
    })

  }

  initForm(){

    let skills = new FormArray([]);
    let languages = new FormArray([]);

    for(let skill of this.consultant.skills){
      skills.push(new FormGroup({
        technology: new FormControl(skill.technology),
        seniority: new FormControl(skill.seniority),
        years: new FormControl(skill.years),
      }))
    }

    for(let language of this.consultant.languages){
      languages.push(new FormGroup({
        language: new FormControl(language.language),
        level: new FormControl(language.level),
      }))
    }

    this.userForm = new FormGroup({
      name: new FormControl(this.consultant.name),
      role: new FormControl(this.consultant.role),
      skills: skills,
      languages: languages
    })

  }


  getControls(controlName:string) {
    return (this.userForm.get(controlName) as FormArray).controls;
  }

  saveEdit(){
      this.mainService.updateUser(this.id,
        this.userForm.value.skills,
        this.userForm.value.languages,
        this.userForm.value.role,
        this.userForm.value.name);

  }

  addSkill(){
    (<FormArray>this.userForm.get('skills')).push(
      new FormGroup({
        technology: new FormControl(),
        seniority: new FormControl(),
        years: new FormControl(),
      })
    )
  }

  addLanguage(){
    (<FormArray>this.userForm.get('languages')).push(
      new FormGroup({
        language: new FormControl(),
        level: new FormControl(),
      })
    )
  }

  removeSkill(i:number){
    ((<FormArray>this.userForm.get('skills')).removeAt(i));
}

  removeLanguage(i:number){
    ((<FormArray>this.userForm.get('languages')).removeAt(i));
  }


}
