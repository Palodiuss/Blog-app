import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  post: any;
  comment: Object;
  comments: Array<Object>;
  commentForm: FormGroup;
  submitted = false;
  success = false;

  constructor(private route: ActivatedRoute, private data: DataService, private formBuilder: FormBuilder) { 
    this.commentForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      body: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.data.getPost(params.id).subscribe((post: any) => {
        this.post = post.result;
        this.data.getPostComments(post.result.id).subscribe((comments: any) =>{
          this.comments = comments.result;
        })
      })
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.commentForm.invalid) {
      return;
    }

    this.success = true;

    this.data.postComment(this.commentForm.value, this.post.id).subscribe((data:any)=>{
      this.ngOnInit();
      this.commentForm.reset(); 
      this.submitted = false;
      this.success = false;
    })


  }
}
