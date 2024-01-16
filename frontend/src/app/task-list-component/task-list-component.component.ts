import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskServiceService } from '../task-service/task-service.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { taskModel } from '../../model/TaskModel';

@Component({
  selector: 'app-task-list-component',
  templateUrl: './task-list-component.component.html',
  styleUrl: './task-list-component.component.css'
})
export class TaskListComponentComponent {

  taskList: any;
  dataSource: any;
  displayedColumns: string[] = ['title', 'description', 'dueDate', 'actions'];
  @ViewChild(MatPaginator) paginator: MatPaginator|undefined;
  @ViewChild(MatSort) sort: MatSort|undefined;

  constructor(private toastr: ToastrService, private service: TaskServiceService, private router: Router) { }

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

}
