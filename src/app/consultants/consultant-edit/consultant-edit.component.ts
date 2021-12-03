import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MainService} from "../../main.service";
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
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
  isError:boolean = false;
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

    let skills = new FormArray([], Validators.required);
    let languages = new FormArray([], Validators.required);

    if(this.consultant.skills.length){
      for(let skill of this.consultant.skills){
        skills.push(new FormGroup({
          technology: new FormControl(skill.technology, Validators.required),
          seniority: new FormControl(skill.seniority, Validators.required),
          years: new FormControl(skill.years, Validators.required),
        }))
      }
    }

  if(this.consultant.languages.length){
    for(let language of this.consultant.languages){
      languages.push(new FormGroup({
        language: new FormControl(language.language, Validators.required),
        level: new FormControl(language.level, Validators.required),
      }, Validators.required))
    }
  }


    this.userForm = new FormGroup({
      photo: new FormControl(this.consultant.photo, Validators.required),
      name: new FormControl(this.consultant.name, Validators.required),
      role: new FormControl(this.consultant.role, Validators.required),
      skills: skills,
      languages: languages
    }, Validators.required)

  }


  getControls(controlName:string) {
    return (this.userForm.get(controlName) as FormArray).controls;
  }

  saveEdit(){

      if(this.userForm.valid){
        this.isError = false;
        this.mainService.updateUser(this.id,
          this.userForm.value.skills,
          this.userForm.value.languages,
          this.userForm.value.role,
          this.userForm.value.name);
      }
      else{
        this.isError = true;
      }

  }

  addSkill(){
    (<FormArray>this.userForm.get('skills')).push(
      new FormGroup({
        technology: new FormControl('', Validators.required),
        seniority: new FormControl('', Validators.required),
        years: new FormControl('', Validators.required),
      })
    )
  }

  addLanguage(){
    (<FormArray>this.userForm.get('languages')).push(
      new FormGroup({
        language: new FormControl('', Validators.required),
        level: new FormControl('', Validators.required),
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
