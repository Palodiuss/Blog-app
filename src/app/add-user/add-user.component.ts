import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  submitted = false;
  success = false;


  constructor(private formBuilder: FormBuilder, private data: DataService) {
    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      gender: 'male'
    });
   }

 

   onSubmit() {
     this.submitted = true;

     if (this.userForm.invalid) {
       return;
     }

     this.success = true;
     

    this.data.postUser(this.userForm.value).subscribe((data:any)=>{
      console.log(data);
      this.userForm.reset(); 
      this.success = false;
      this.submitted = false;
    })
   
   }

  ngOnInit() {
  }

}
