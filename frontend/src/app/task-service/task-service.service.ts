import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  readonly apiURL="https://localhost:44322/api" ;

  constructor(private http:HttpClient,private router:Router) { }

  getTaskList():Observable<any[]>{
    return this.http.get<any>(this.apiURL+"/tasks");
  }

  addTask(val:any){
    return this.http.post(this.apiURL+"/tasks",val);
  }

  updateTask(id:any,val:any){
    return this.http.put(this.apiURL+"/tasks/"+id,val);
  }

  deleteTask(id:any){
    return this.http.delete(this.apiURL+"/tasks/"+id);
  }

  getdetailTask(id:any):Observable<any>{
    return this.http.get<any>(this.apiURL+"/tasks/"+id);
  }
  
}
