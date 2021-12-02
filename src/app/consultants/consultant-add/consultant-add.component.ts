import { Component, OnInit } from '@angular/core';
import {UserModel} from "../../user.model";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {MainService} from "../../main.service";

@Component({
  selector: 'app-consultant-add',
  templateUrl: './consultant-add.component.html',
  styleUrls: ['./consultant-add.component.css']
})
export class ConsultantAddComponent implements OnInit {

  userForm!: FormGroup;

  levelOptions = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  roleOptions = ['developer', 'smart', 'analytik', 'product manager'];
  seniorityOptions = [1,2,3,4,5,6,7,8,9,10];

  isError: boolean = false;


  constructor(private mainService: MainService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){

    let skills = new FormArray([]);
    let languages = new FormArray([]);


    this.userForm = new FormGroup({
      photo: new FormControl(),
      name: new FormControl(),
      role: new FormControl(),
      skills: skills,
      languages: languages
    })

  }


  getControls(controlName:string) {
    return (this.userForm.get(controlName) as FormArray).controls;
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

  saveUser(){
    if(this.userForm.valid){
      this.isError = false;
      let tmpForm = this.userForm.value;
      this.mainService.addUser(tmpForm.photo, tmpForm.skills, tmpForm.languages, tmpForm.role, tmpForm.name)
    }
    else{
      this.isError = true;
    }
  }

  showTable(controlName: string){
    return (this.userForm.get(controlName) as FormArray).controls.length;
  }

}
