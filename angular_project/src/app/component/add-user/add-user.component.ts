import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  changetype:boolean=true;
  visible:boolean=true;

  selectedImg!:File
  formValue!:FormGroup
  constructor(private httpU:UserService, private aRoute:Router){}
  ngOnInit(): void {
    this.formValue=new FormGroup({
      username:new FormControl(''),
      email:new FormControl(''),
      password:new FormControl('')    
    })
  }
  profile_pic(event:any){
    this.selectedImg=event.target.files[0]
    console.log("selected img",this.selectedImg);
    
  }
  viewpass(){
    this.visible=!this.visible
    this.changetype=!this.changetype
  }
  submitData(){
    console.log("recive all data:",this.formValue.value);
    
    const formdata:FormData=new FormData()
    formdata.append("username",this.formValue.value.username)
    formdata.append("email",this.formValue.value.email)
    formdata.append("password",this.formValue.value.password)
    formdata.append("image",this.selectedImg,this.selectedImg.name)

    this.httpU.add_user(formdata).subscribe((res:any)=>{
      console.log("all data post",res);
      if(res){
        this.aRoute.navigate(['/login'])
      }
      if (res.status==200) {
        alert("registion done")
      } else {
        alert("registion Error,try agen")
        
      }
    })
  }
}
