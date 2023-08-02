import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../claess/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 user_api:string="http://localhost:3400/add"
 user_api2:string="http://localhost:3400/login"
 edit_api:string="http://localhost:3400/edit"
 update_api:string="http://localhost:3400/update"
 delete_api:string="http://localhost:3400/delete"
 view_user:string="http://localhost:3400/get"


  constructor(private httpuser:HttpClient) { }

  add_user(formdata:any):Observable<User[]>{
    return this.httpuser.post<User[]>(this.user_api,formdata)
  }
  login_user(formdata:any):Observable<User[]>{
    return this.httpuser.post<User[]>(this.user_api2,formdata).pipe(catchError(this.errorHandler))
  }
  edit_user(id:number):Observable<User[]>{
    return this.httpuser.get<User[]>(`${this.edit_api}/${id}`)
  }  view_user1():Observable<User[]>{
    return this.httpuser.get<User[]>(this.view_user)
  }
  update_user(id:any,formdata:any):Observable<User[]>{
    return this.httpuser.put<User[]>(`${this.update_api}/${id}`,formdata)
  }
  delete_user(id:any):Observable<User[]>{
    return this.httpuser.delete<User[]>(`${this.delete_api}/${id}`)
  }

  errorHandler(error:HttpErrorResponse)
  {
    return throwError(()=>error || "server error")
  }

}
