import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodoListComponent} from './components/todo-list/todo-list.component';
import {AddComponent} from './components/add/add.component';
import {EditComponent} from './components/edit/edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: TodoListComponent },
  { path: 'add', pathMatch: 'full', component: AddComponent },
  { path: 'edit/:id', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
