import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskServiceService } from '../task-service/task-service.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { taskModel } from '../../model/TaskModel';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-task-form-component',
  templateUrl: './task-form-component.component.html',
  styleUrl: './task-form-component.component.css'
})
export class TaskFormComponentComponent {

  taskModel:taskModel=new taskModel();
  taskId = this.route.snapshot.paramMap.get('id');


  constructor(private datePipe:DatePipe, private route:ActivatedRoute,private service:TaskServiceService, private toastr:ToastrService,private router:Router){}


  ngOnInit(): void {
    console.log(this.taskId);
    if(this.taskId!=null){
      this.getTaskDetail(this.taskId);
    }
  }

  
  public addTask(){
    
    console.log(this.taskModel);
    this.service.addTask(this.taskModel)
    .pipe(
      tap((data)=>{
        console.log(data);
        console.log('success');
        this.toastr.success('Task added successfully.');
        this.router.navigate(['']);
      }),
      catchError((error) => {
        this.toastr.error('Task is not added.');
        console.log(error);
        console.log('failed');
        return throwError(() => error); 
      })
    ).subscribe();
  }

  public updateTask(){
    if(this.taskId!=null){
      console.log(this.taskModel);
    this.service.updateTask(this.taskId,this.taskModel)
    .pipe(
      tap((data)=>{
        console.log(data);
        console.log('success');
        this.toastr.success('Task updated successfully.');
        this.router.navigate(['']);
      }),
      catchError((error) => {
        this.toastr.error('Task is not updated.');
        console.log(error);
        console.log('failed');
        return throwError(() => error); 
      })
    ).subscribe();
    }
    else{
      this.toastr.error('Go to task list and select task to update.');
    }
    
  }

  public getTaskDetail(id:any){
    this.service.getdetailTask(id)
    .pipe(
      tap((data)=>{
        console.log(data);
        console.log('success');
        this.taskModel=data;
        this.taskModel.dueDate = this.datePipe.transform(this.taskModel.dueDate, 'yyyy-MM-dd');
        console.log(this.taskModel.dueDate);
        
      }),
      catchError((error) => {
        this.toastr.error('Task is not loaded.');
        console.log(error);
        console.log('failed');
        return throwError(() => error); 
      })
    ).subscribe();
  }

}
