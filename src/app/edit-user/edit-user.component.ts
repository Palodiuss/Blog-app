import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userForm: FormGroup;
  user: any;
  submitted = false;
  success = false;
  id: number

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private data: DataService) {
    this.route.params.subscribe(params => {
      this.data.getUser(params.id).subscribe((user: any) => {
        this.user = user.result;
        this.id = params.id;

        this.userForm = this.formBuilder.group({
          first_name: [this.user.first_name, Validators.required],
          last_name: [this.user.last_name, Validators.required],
          email: [this.user.email, [Validators.email, Validators.required]],
          phone: [this.user.phone, [Validators.required, Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$")]],
          address: [this.user.address, Validators.required],
          gender: 'male'
        });
      });
    });


   }

   onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid) {
      return;
    }

    this.success = true;
 

    this.data.editUser(this.id, this.userForm.value).subscribe((data:any)=>{
      console.log(data);
    })
   }

  ngOnInit() {
  }

}
