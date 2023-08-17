import { Component,OnInit } from '@angular/core';
import { CategoryService } from '../service/category.service';
import { CategoryModel } from '../model/catModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { todoModel } from './mylist.model';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})
export class MylistComponent implements OnInit {
  CategoryData!: CategoryModel[];

  TodoForm!: FormGroup;
  TodoMOdelObj: todoModel = new todoModel();
  TodoData!: todoModel[];
  selectedcategory!:string;

  constructor( private category:CategoryService,private todo:TodoService,private formbuilder:FormBuilder){}
  ngOnInit(): void {
    this.TodoForm= this.formbuilder.group({
      name:['',[Validators.required,Validators.pattern('[a-zA-Z]+$')]],
      date:['',[Validators.required]],
      category:['',[Validators.required]],
      assignee:['',[Validators.required,Validators.pattern('[a-zA-Z]+$')]],
      starttime:['',[Validators.required]],
      endtime:['',[Validators.required]],
     })
    
    this.getcategory();
    this.getTodo();   
  }

  getcategory() {
    this.category.getcategory().subscribe(res => {
      this.CategoryData = res;
    })
  }
  
  getTodo() {
    this.todo.getTodo().subscribe(res => {
      this.TodoData = res;
    })
  }

  postTodo() {
    console.log(this.TodoForm.value);
    this.TodoMOdelObj.name = this.TodoForm.value.name;
    this.TodoMOdelObj.date = this.TodoForm.value.date;
    this.TodoMOdelObj.category = this.TodoForm.value.category;
    this.TodoMOdelObj.assignee = this.TodoForm.value.assignee;
    this.TodoMOdelObj.starttime = this.TodoForm.value.starttime;
    this.TodoMOdelObj.endtime = this.TodoForm.value.endtime;
    
    
    this.todo.postTodo(this.TodoMOdelObj)
      .subscribe(res => {
        console.log(res);
        alert('ToDo Added Succesfully')
        this.TodoForm.reset();
        this.getTodo();
      })
  }
 
  deleteTodo(row: any) {
    this.todo.deleteTodo(row.id)
      .subscribe(res => {
        alert(" ToDo Delete");
        this.getTodo();
      })
  }
  onEdit(row: any) {
    this.TodoMOdelObj.id = row.id;
    this.TodoForm.controls['name'].setValue(row.name);
    this.TodoForm.controls['date'].setValue(row.date);
    this.TodoForm.controls['category'].setValue(row.category);
    this.TodoForm.controls['assignee'].setValue(row.assignee);
    this.TodoForm.controls['starttime'].setValue(row.starttime);
    this.TodoForm.controls['endtime'].setValue(row.endtime);
  }
  updateTodo() {
    this.TodoMOdelObj.name = this.TodoForm.value.name;
    this.TodoMOdelObj.date = this.TodoForm.value.date;
    this.TodoMOdelObj.category = this.TodoForm.value.category;
    this.TodoMOdelObj.assignee = this.TodoForm.value.assignee;
    this.TodoMOdelObj.starttime = this.TodoForm.value.starttime;
    this.TodoMOdelObj.endtime = this.TodoForm.value.endtime;
    
    this.todo.updateTodo(this.TodoMOdelObj, this.TodoMOdelObj.id)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('cancel')
        ref?.click();
        alert('ToDo updated Succesfully')
        this.TodoForm.reset();
        this.getTodo();
      })
  }
  // OnChangeEvent(event:any){
  //  this.selectedcategory= event.target.value
  //  console.log(event.target.value);

  // }
  get name(){
    return this.TodoForm.get('name')
  }
  
  get date(){
    return this.TodoForm.get('date')
  }
  get categoryform(){
    return this.TodoForm.get('category')
  }
  get assignee(){
    return this.TodoForm.get('assignee')
  }
  get starttime(){
    return this.TodoForm.get('starttime')
  }
  get endtime(){
    return this.TodoForm.get('endtime')
  }
}
