import {UserModel} from "./user.model";

export class MainService{
  users: UserModel[] = [{
    id: 1,
    photo: 'https://media-exp1.licdn.com/dms/image/C4D03AQHt6PFyCSkBJA/profile-displayphoto-shrink_200_200/0/1632397018249?e=1639612800&v=beta&t=vpSeNpdwt2LX18vhbhdnacY0CtekKx5VWYwCZd0bklE',
    name: 'Tomas Erben',
    skills: [{
      technology: 'javascript',
      seniority: 6,
      years: 1,
    },{
      technology: 'html',
      seniority: 4,
      years: 1,
    },{
      technology: 'css',
      seniority: 4,
      years: 1,
    }],
    languages: [{
      language: 'english',
      level: 'C1',
    },
    {
      language: 'spanish',
      level: 'B2',
    },
    ],
    role: 'developer',
    experiences: [{
      from: '01/2004',
      to: '03/2017',
      role: 'developer',
      client: 'KB',
      description: 'Description',
      technologies: ['javascript', 'html', 'css'],
    }],
    skillCount: 10,
  },{
    id: 2,
    photo: 'https://uploads-ssl.webflow.com/614c9f162ff862f2367dbdb1/615b05e60ac84626399dc122_petr-lev.jpg',
    name: 'Petr Lev',
    skills: [{
      technology: 'javascript',
      seniority: 4,
      years: 1,
    },
    {
      technology: 'python',
      seniority: 4,
      years: 2,
    },
    {
        technology: 'nodejs',
        seniority: 9,
        years: 4,
    },
    ],
    languages: [{
      language: 'english',
      level: 'C1',
    }],
    role: 'developer',
    experiences: [{
      from: '01/2004',
      to: '03/2017',
      role: 'developer',
      client: 'KB',
      description: 'Description',
      technologies: ['javascript', 'html', 'css'],
    }],
    skillCount: 10,
  },{
    id: 3,
    photo: 'https://uploads-ssl.webflow.com/614f367d1411204cfd955794/61850170b132924e9b91e1fb_epptec-2%20173336.jpg',
    name: 'Leos Rehacek',
    skills: [{
      technology: 'javascript',
      seniority: 4,
      years: 1,
    }],
    languages: [{
      language: 'english',
      level: 'C1',
    }],
    role: 'developer',
    experiences: [{
      from: '01/2004',
      to: '03/2017',
      role: 'developer',
      client: 'KB',
      description: 'Description',
      technologies: ['javascript', 'html', 'css'],
    }],
    skillCount: 10,
  }]


  getUserById(id:number){
    if(this.users.find((user) => user.id === Number(id))){
      return this.users.find((user) => user.id === Number(id));
    }
    return 'User not found.';
  }
}
