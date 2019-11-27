import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { UsersComponent } from './users/users.component';
import { NewPostComponent } from './new-post/new-post.component';
import { AddUserComponent} from './add-user/add-user.component';
import { UserComponent} from './user/user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { PostComponent } from './post/post.component';


const routes: Routes = [
  {
    path: '', component: FeedComponent
  },
  {
    path: "users", component: UsersComponent 
  },
  {
    path: 'users/:id', component: UserComponent
  },
  {
    path: 'users/edit/:id', component: EditUserComponent
  },
  {
    path: 'posts/:id', component: PostComponent
  },
  {
    path: 'add_post', component: NewPostComponent
  },
  {
    path: 'add_user', component: AddUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
