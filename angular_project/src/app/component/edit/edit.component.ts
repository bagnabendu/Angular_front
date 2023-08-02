import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  formValue!:FormGroup
  eid!:any
  ed_user!:any
  // selectedImg:File
  constructor(private httped:UserService, private aroute:ActivatedRoute,private Aroute:Router){}
  ngOnInit(): void {
    this.formValue=new FormGroup({
      username: new FormControl(''),
      email: new FormControl(''),
      // image:new FormControl(''),
      password: new FormControl('')
    })
    this.aroute.paramMap.subscribe((param)=>{
     this.eid=param.get('_id')
     console.log(this.eid);
     this.httped.edit_user(this.eid).subscribe((res:any)=>{
      this.ed_user=res.data
      console.log("edit user:", this.ed_user);
      this.formValue=new FormGroup({
        username:new FormControl(this.ed_user.username),
        email:new FormControl(this.ed_user.email),
        password:new FormControl(this.ed_user.password)
      })
     })
    })
  }
  // profile_pic(event:any){
  //   this.selectedImg=event.target.files[0]
  //   console.log("selected img",this.selectedImg);
    
  // }
  submitData(){
    console.log("data edited:",this.formValue.value);
    alert("data edited")
    this.httped.update_user(this.eid,this.formValue.value).subscribe((res:any)=>{
      console.log("sucessfully update:",res.data);
      if(res){
        this.Aroute.navigate(['/view'])
      }
      
    })
  }
}
