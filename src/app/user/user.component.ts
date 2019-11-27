import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../data.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  user: any;
  userForm: FormGroup;
  posts: any;
  submitted = false;
  success = false;

  constructor(private route: ActivatedRoute, private data: DataService, private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.data.getUser(params.id).subscribe((user: any) => {
        this.user = user.result;
        this.data.getPosts(this.user.id).subscribe((data:any) => {
          this.posts = data;
        })
      });
    });


  }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    this.success = true;
   

   this.data.postPost(this.userForm.value, this.user.id).subscribe((data:any)=>{
    console.log(data);
    this.userForm.reset();
    this.submitted = false;
    this.success = false;
  })
  }
}
