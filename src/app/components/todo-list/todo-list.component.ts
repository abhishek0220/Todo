import { Component, OnInit } from '@angular/core';
import {ApiService} from './../../service/api.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  alltodo : any = [];
  ads : string = "ef";
  constructor(private apiservice:ApiService) {
  }

  ngOnInit(): void {
    this.readtodo();
  }

  readtodo(){
    this.apiservice.getTodo().subscribe((data) =>{
      var tmp = [];
      for(var key in data){
        var dic = data[key];
        dic["id"] = key;
        tmp.push(dic)
      }
      this.alltodo = tmp;
    })  
  }


}
