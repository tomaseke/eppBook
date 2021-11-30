import {UserModel} from "./user.model";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {map} from "rxjs";

@Injectable()
export class MainService{

  users!: UserModel[];

  constructor(private http: HttpClient) {
    this.fetchUsers().subscribe(res => {
      this.users = res[0];
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
    return 'User not found.';
  }

  getUsersByTechnology(technology: string) {
    if(technology !== ""){
      const filteredUsers = [];
      for (let user of this.users) {
        for (let skill of user.skills) {
          if (skill.technology === technology) {
            filteredUsers.push(user);
          }
        }
      }
    return filteredUsers;
    }
    else{
      return this.users;
    }

  }


  fetchUsers(){
   return this.http
      .get('https://eppbook-c9da8-default-rtdb.firebaseio.com/users.json')
      .pipe(
        map(res => {
            let arr:any = [];
            for(const key in res){
              // @ts-ignore
              arr.push(res[key]);
            }
            return arr;
          }
        )
      )

  }
}
