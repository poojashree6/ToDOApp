import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TodoService } from '../service/todo.service';
import { todoModel } from '../mylist/mylist.model';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  datacategory!: string;
   TodoData!: todoModel[];

  constructor(private activatedRoute: ActivatedRoute, private todo: TodoService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param: Params) => {
      this.datacategory = param['get']('category');
      this.FilterCategory(this.datacategory);
    })

  }
  FilterCategory(category:string){
  this.todo.fetchdata(category).subscribe((data) => {
  console.log(category);
  console.log(data);
  this.TodoData=data;
  })
  }

}
