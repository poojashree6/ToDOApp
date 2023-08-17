import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { todoModel } from '../mylist/mylist.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  baseurl:string="http://localhost:3000/Todo"

  //loacl variable http referring to httpclient instance

  constructor(private http:HttpClient) { }    
  
  getTodo() {
    return this.http.get<todoModel[]>(this.baseurl)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  postTodo(data: any) {
    return this.http.post<todoModel>("http://localhost:3000/Todo", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  
  deleteTodo(id: number) {
    return this.http.delete<todoModel>(this.baseurl + '/' + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  updateTodo(data: any, id: number) {
    return this.http.put<todoModel>(this.baseurl + '/' + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  fetchdata(category:string){
    return this.http.get<todoModel[]>(this.baseurl + '?category=' + category); 
  }
}
