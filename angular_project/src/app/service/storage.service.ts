import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  setData(fname:string,email:string,token:string)
  {
    window.localStorage.setItem('f_name',fname)
    window.localStorage.setItem('email',email)
    window.localStorage.setItem('token',token)
  }
  getData(){
    const saveData=[]
    let data={
      username:window.localStorage.getItem('f_name'),
      email:window.localStorage.getItem('email'),      
    }
    saveData.push(data)
    return saveData
  }
  getToken(){
    return window.sessionStorage.getItem('token')
  }
}
