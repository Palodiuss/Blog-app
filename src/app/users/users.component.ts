import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: Object;
  user: Object;
  page: number;
  allPages: number



  constructor(private data: DataService) { 
    this.page = 1;
  }

  ngOnInit() {
    this.displayPage();
  }


  delete(event, id) {
     this.data.deleteUser(id).subscribe(data => {
     })
     this.ngOnInit();
  }

  displayPage(type = null) {
    if (type === 'next') ++this.page;
    else if (type === 'prev') --this.page;
    this.data.getUsers(this.page).subscribe((data:any) => {
      this.users = data;
      this.allPages = data._meta.pageCount;
      console.log(data._meta);
    })
  }

}
