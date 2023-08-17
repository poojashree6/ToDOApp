import { Component,OnInit} from '@angular/core';
import{FormBuilder,FormGroup, Validators} from '@angular/forms'
import { CategoryModel } from '../model/catModel';
import { CategoryService } from '../service/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  categoryform!: FormGroup;
  categoryMOdelObj: CategoryModel = new CategoryModel();
  CategoryData!: CategoryModel[];
  showadd!: Boolean;
  showupdate!: Boolean;

constructor(private formbuilder:FormBuilder,private category:CategoryService){}

ngOnInit(): void {
  this.categoryform= this.formbuilder.group({
   name:['',[Validators.required,Validators.pattern('[a-zA-Z]+$')]],
  })
  this.getcategory();
}
postcategory() {
  console.log(this.categoryform.value);
  this.categoryMOdelObj.name = this.categoryform.value.name;
  
  this.category.postcategory(this.categoryMOdelObj)
    .subscribe(res => {
      console.log(res);
      alert('category Added Succesfully')
      this.categoryform.reset();
      this.getcategory();
     
    })
   
}
Onclickpostcategory() {
  this.categoryform.reset();
  // this.showadd = true;
  // this.showupdate = false;
}

getcategory() {
  this.category.getcategory().subscribe(res => {
    this.CategoryData = res;
  })
}

deletecategory(row: any) {
  this.category.deletecategory(row.id)
    .subscribe(res => {
      alert(" category Delete");
      this.getcategory();
    })
}
onEdit(row: any) {
  this.categoryMOdelObj.id = row.id;
  this.categoryform.controls['name'].setValue(row.name);
  this.showadd = false;
  this.showupdate = true;
}
updatecategory() {
  this.categoryMOdelObj.name = this.categoryform.value.name;
  this.category.updatecategory(this.categoryMOdelObj, this.categoryMOdelObj.id)
    .subscribe(res => {
      console.log(res);
      let ref = document.getElementById('cancel')
      ref?.click();
      alert('ToDo updated Succesfully')
      this.categoryform.reset();
      this.getcategory();
    })
}
get name(){
  return this.categoryform.get('name')
}

}
