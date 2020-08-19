import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {ApiService} from './../../service/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  todoForm : FormGroup;
  constructor(
    public fb: FormBuilder,
    private actRoute : ActivatedRoute,
    private apiService : ApiService,
    private ngZone : NgZone,
    private router : Router
  ) {
    this.mainForm();
  }

  ngOnInit(): void {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.apiService.getTodobyID(id).subscribe((data) => {
      if(data == null){
        this.ngZone.run(() => this.router.navigateByUrl('/'))
      }
      else{
        
        this.todoForm.setValue({
          title: data['title'],
          isfavourite: data['isfavourite'],
          iscompleted: data['iscompleted'],
          description : data['description']
        })

      }
    })
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
    if (!this.todoForm.valid) {
      console.log("not valid")
      return false;
    } else {
      if (window.confirm('Are you sure?')) {
        let id = this.actRoute.snapshot.paramMap.get('id');
        this.apiService.editTodo(id, this.todoForm.value).subscribe(res => {
            this.router.navigateByUrl('/');
            console.log('Content updated successfully!')
          }, (error) => {
            console.log(error)
          })
      }
    }
  }

}
