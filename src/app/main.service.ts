import {Language, Roles, Skill, UserModel} from "./user.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {exhaustMap, map, pipe, Subject, take} from "rxjs";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable()
export class MainService{

  users!: UserModel[];
  updatedUsers = new Subject<UserModel[]>();

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {
    this.fetchUsers().subscribe(res => {
      this.users = res;
    })
  }


  // users: UserModel[] = [{
  //   id: 2,
  //   photo: 'https://uploads-ssl.webflow.com/614c9f162ff862f2367dbdb1/615b05e60ac84626399dc122_petr-lev.jpg',
  //   name: 'Petr Lev',
  //   skills: [{
  //     technology: 'javascript',
  //     seniority: 4,
  //     years: 1,
  //   },
  //     {
  //       technology: 'python',
  //       seniority: 4,
  //       years: 2,
  //     },
  //     {
  //       technology: 'nodejs',
  //       seniority: 9,
  //       years: 4,
  //     },
  //   ],
  //   languages: [{
  //     language: 'english',
  //     level: 'C1',
  //   }],
  //   role: 'developer',
  //   experiences: [{
  //     from: '01/2004',
  //     to: '03/2017',
  //     role: 'developer',
  //     client: 'KB',
  //     description: 'Description',
  //     technologies: ['javascript', 'python', 'nodejs'],
  //   }],
  //   skillCount: 3,
  // }, {
  //   id: 3,
  //   photo: 'https://uploads-ssl.webflow.com/614f367d1411204cfd955794/61850170b132924e9b91e1fb_epptec-2%20173336.jpg',
  //   name: 'Leos Rehacek',
  //   skills: [{
  //     technology: 'javascript',
  //     seniority: 4,
  //     years: 1,
  //   }],
  //   languages: [{
  //     language: 'english',
  //     level: 'C1',
  //   }],
  //   role: 'developer',
  //   experiences: [{
  //     from: '01/2004',
  //     to: '03/2017',
  //     role: 'developer',
  //     client: 'KB',
  //     description: 'Description',
  //     technologies: ['javascript', 'html', 'css'],
  //   }],
  //   skillCount: 10,
  // },
  //   {
  //     id: 1,
  //     photo: 'https://media-exp1.licdn.com/dms/image/C4D03AQHt6PFyCSkBJA/profile-displayphoto-shrink_200_200/0/1632397018249?e=1639612800&v=beta&t=vpSeNpdwt2LX18vhbhdnacY0CtekKx5VWYwCZd0bklE',
  //     name: 'Tomas Erben',
  //     skills: [{
  //       technology: 'javascript',
  //       seniority: 6,
  //       years: 1,
  //     }, {
  //       technology: 'html',
  //       seniority: 4,
  //       years: 1,
  //     }, {
  //       technology: 'css',
  //       seniority: 4,
  //       years: 1,
  //     }],
  //     languages: [{
  //       language: 'english',
  //       level: 'C1',
  //     },
  //       {
  //         language: 'spanish',
  //         level: 'B2',
  //       },
  //     ],
  //     role: 'developer',
  //     experiences: [{
  //       from: '01/2004',
  //       to: '03/2017',
  //       role: 'developer',
  //       client: 'KB',
  //       description: 'Description',
  //       technologies: ['javascript', 'html', 'css'],
  //     }],
  //     skillCount: 6,
  //   }]


  getUserById(id: number) {
    if (this.users.find((user) => user.id === Number(id))) {
      return this.users.find((user) => user.id === Number(id));
    }
    return null;
  }


  filterUsers(technology: string = '', technologySeniority: number = 0, language:string = '', languageLevel: string = '', role:string = '') {


    /////// REFACTOOOOOOOOOOOOOOOOOOOOOOOOR!!!!!!!!!!! ///////////////

    const usersFilteredByTechnology: UserModel[] = [];
      this.users.forEach(user => {
        return user.skills.forEach(skill => {
          if (skill.technology === technology && skill.seniority >= technologySeniority) {
            usersFilteredByTechnology.push(user);
          }
        })
      })

    const usersFilteredByLanguage: UserModel[] = [];

      this.users.forEach(user => {
         user.languages.forEach(lang => {
          if (lang.language === language && lang.level === languageLevel) {
            usersFilteredByLanguage.push(user);
          }
        })
      })


    const usersFilteredByRole: UserModel[] = [];

     this.users.forEach(user => {
       if(user.role === role){
         usersFilteredByRole.push(user);
       }
     })


    const allInfoInputted = !!(technology && technologySeniority && language && languageLevel && role);
    const users: UserModel[] = [];
    if(allInfoInputted){
      usersFilteredByRole.forEach(user => {
        usersFilteredByTechnology.forEach(user1 => {
          usersFilteredByLanguage.forEach(user2 => {
            if(user.id === user1.id && user1.id === user2.id){
              users.push(user);
            }
          })
        })
      })
    }

    return users;

  }


  fetchUsers(){
    return this.authService.user.pipe(take(1),
      exhaustMap(user => {
      return this.http.get(`https://eppbook-c9da8-default-rtdb.firebaseio.com/users.json?auth=${user!.token}`)
    }),map(res => {
        let arr:any = [];
        for(const key in res){
          // @ts-ignore
          arr.push(res[key]);
        }
        return arr;
      }
    ))
  }

  updateUser(id: number, skills: Skill[], languages: Language[], role: Roles, name:string){

    if(this.getUserById(id)){
      this.getUserById(id)!.skills = skills;
      this.getUserById(id)!.languages = languages;
      this.getUserById(id)!.role = role;
      this.getUserById(id)!.name = name;

      let token = JSON.parse(localStorage.getItem('userData')!)._token;

      this.http.put(`https://eppbook-c9da8-default-rtdb.firebaseio.com/users.json?auth=${token}`, this.users)
        .subscribe(pipe(() => this.router.navigate(['/consultants'])));
    }

  }
}
