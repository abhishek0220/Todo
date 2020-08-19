import { Component, OnInit } from '@angular/core';
import {ApiService} from './../../service/api.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  alltodo : any = [];
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
      tmp.sort((a,b) => {
        if(a.iscompleted == b.iscompleted){
          if(a.lastepoch > b.lastepoch) return 0;
          else return 0;
        }
        return a.iscompleted - b.iscompleted;
      })
      this.alltodo = tmp;
    })  
  }

  deleteTodo(id:string, index){
    if(window.confirm('Are you sure?')){
      this.apiservice.removeTodo(id).subscribe((data) => {
        console.log("deleted")
        this.alltodo.splice(index, 1);
      });
    }
  }


}
