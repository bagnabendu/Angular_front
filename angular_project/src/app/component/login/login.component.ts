import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
// import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  changetype:boolean=true;
  visible:boolean=true;
  serverErr!:string;
  loginValue!:FormGroup
  constructor(private httplo:UserService,private Route:Router){}
  ngOnInit(): void {
   this.loginValue=new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
   })
  }
  viewpass(){
    this.visible=!this.visible
    this.changetype=!this.changetype
  }
  submitData(){

      console.log("data submitted:",this.loginValue.value);
      this.httplo.login_user(this.loginValue.value).subscribe((res:any)=>{
      console.log("login sucessfully:",res.result);
      if (res.status==true) {
      this.Route.navigate(['/view'])
      alert("sucessfully login")
      }else{
      alert("somthing is wrong,try.....")
      }
      },
      (err)=>{
        console.log("Http Error:",err);
        this.serverErr=err.message 
      })      
      }
    }
