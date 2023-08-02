import { Component,OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit{
  allitem!:any
  constructor(private httpit:UserService) {}

  ngOnInit(): void {
    this.httpit.view_user1().subscribe((res:any) => {
      console.log("item view:", res.data);

      this.allitem = res.data

    })
  }
  deletee(id:number){

this.httpit.delete_user(id).subscribe((res:any)=>{
  console.log(res.data);
  alert("delete sucessfully")
  this.httpit.view_user1().subscribe((res:any)=>{
    this.allitem=res.data
    console.log("delete and relode:",res.data);
    
  })
})
 }

}
