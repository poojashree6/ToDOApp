import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { CategoryModel } from '../model/catModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private http:HttpClient) { }
  baseurl: string = "http://localhost:3000/category"

  postcategory(data: any) {
    return this.http.post<CategoryModel>("http://localhost:3000/category", data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  getcategory() {
    return this.http.get<CategoryModel[]>(this.baseurl)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  deletecategory(id: number) {
    return this.http.delete<CategoryModel>(this.baseurl + '/' + id)
      .pipe(map((res: any) => {
        return res;
      }))
  }
  updatecategory(data: any, id: number) {
    return this.http.put<CategoryModel>(this.baseurl + '/' + id, data)
      .pipe(map((res: any) => {
        return res;
      }))
  }
}
