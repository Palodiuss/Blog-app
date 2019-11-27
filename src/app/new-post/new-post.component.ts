import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../data.service";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.scss"]
})
export class NewPostComponent implements OnInit {
  ////////////

  postForm: FormGroup;
  submitted = false;
  success = false;

  users: any[];
  allUsers: any[];

  constructor(private formBuilder: FormBuilder, private data: DataService) {
    this.postForm = this.formBuilder.group({
      title: ["", Validators.required],
      body: ["", Validators.required],
      id: ["", Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.postForm.invalid) {
      return;
    }

    this.success = true;

   this.data.postPost(this.postForm.value, this.postForm.value.id).subscribe((data:any)=>{
     console.log(data);
     this.submitted = false;
     this.success = false;
     this.postForm.reset();
   })
  
  }

  search(query: any) {
    this.data.getUsersByName(query.term).subscribe((data: any) => {
      this.users = data.result;
    });
  }

  ngOnInit() {
    this.data.getUsers().subscribe((data: any) => {
      this.users = data.result;
    });
  }
}
