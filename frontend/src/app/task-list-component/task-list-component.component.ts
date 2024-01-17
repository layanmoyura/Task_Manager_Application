import { Component, ViewChild} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskServiceService } from '../task-service/task-service.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { taskModel } from '../../model/TaskModel';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-task-list-component',
  templateUrl: './task-list-component.component.html',
  styleUrl: './task-list-component.component.css'
})
export class TaskListComponentComponent {

  taskList: any;
  dataSource: any;
  displayedColumns: string[] = ['title', 'description', 'dueDate', 'actions'];
  taskModel:taskModel=new taskModel();
  showDetailsModal: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator|undefined;
  @ViewChild(MatSort) sort: MatSort|undefined;

  constructor(private toastr: ToastrService, private service: TaskServiceService, private router: Router,private datePipe:DatePipe) { }

  ngOnInit(): void {
    this.refreshList();
  }

  public refreshList() {
    this.service.getTaskList()
      .pipe(
        tap((data)=>{
          console.log(data);
          console.log('success');
          this.taskList = data;
          this.dataSource = new MatTableDataSource<taskModel>(this.taskList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(this.dataSource.sort);
        }),
        catchError((error) => {
          
          this.toastr.error('Data is not loaded.');
          console.log(error);
          console.log('failed');
          return throwError(() => error); 
        })
      ).subscribe();
  }

  public deleteTask(id: number) {
    this.service.deleteTask(id)
      .pipe(
        tap((data)=>{
          console.log(data);
          console.log('success');
          this.toastr.success('Task deleted successfully.');
          this.refreshList();
        }),
        catchError((error) => {
          this.toastr.error('Task is not deleted.');
          console.log(error);
          console.log('failed');
          return throwError(() => error); 
        })
      ).subscribe();
  }

  public openDetailsModal(id:any){
    this.service.getdetailTask(id)
    .pipe(
      tap((data)=>{
        console.log(data);
        console.log('success');
        console.log(this.showDetailsModal)
        this.taskModel=data;
        this.taskModel.dueDate = this.datePipe.transform(this.taskModel.dueDate, 'yyyy-MM-dd');
        console.log(this.taskModel.dueDate);
        this.showDetailsModal = true;
        console.log(this.showDetailsModal)
        
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
