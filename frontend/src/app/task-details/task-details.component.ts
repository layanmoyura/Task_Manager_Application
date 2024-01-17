import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskServiceService } from '../task-service/task-service.service';
import { catchError,tap } from 'rxjs';
import { throwError } from 'rxjs';
import { taskModel } from '../../model/TaskModel';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent {

  taskId = this.route.snapshot.paramMap.get('id');
  taskModel:taskModel=new taskModel();

  constructor(private route: ActivatedRoute,private service:TaskServiceService,private toastr:ToastrService, private datePipe:DatePipe){}

  ngOnInit(): void {
    console.log(this.taskId);
    if(this.taskId!=null){
      this.getDetails(this.taskId);
    }
  }

  public getDetails(id:any){
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
