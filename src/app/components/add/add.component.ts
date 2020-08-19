import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {ApiService} from './../../service/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  todoForm : FormGroup;
  submitted = false;
  checked : boolean;
  constructor(
    public fb: FormBuilder,
    private apiService : ApiService,
    private ngZone : NgZone,
    private router : Router
  ) {
    this.mainForm();
    this.checked = true;
  }

  ngOnInit(): void {
  }

  mainForm() {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required]],
      isfavourite: [false, [Validators.required]],
      iscompleted: [false, [Validators.required]],
      description : ['']
    })
  }
  onSubmit(){
    if (!this.todoForm.valid) return false;
    else {
      this.apiService.addTodo(this.todoForm.value).subscribe(
        (res) => {
          console.log('Todo successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('/'))
        }, (error) => {
          console.log(error);
        });
    }
  }

}
