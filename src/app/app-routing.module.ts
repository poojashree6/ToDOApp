import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MylistComponent } from './mylist/mylist.component';
import { CheckComponent } from './check/check.component';

const routes: Routes = [
  {path:'Home',component:HomeComponent},
  {path:'MyList',component:MylistComponent},
  {path:'Categorylist/:category',component:CheckComponent},
  {path:'',redirectTo:'/Home',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
