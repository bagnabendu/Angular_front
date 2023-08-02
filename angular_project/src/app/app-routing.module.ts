import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './component/add-user/add-user.component';
import { LoginComponent } from './component/login/login.component';
import { EditComponent } from './component/edit/edit.component';
import { ViewUserComponent } from './component/view-user/view-user.component';

const routes: Routes = [
  {path:'add',component:AddUserComponent},
  {path:'login',component:LoginComponent},
  {path:'view',component:ViewUserComponent},
  {path:'edit/:_id',component:EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
