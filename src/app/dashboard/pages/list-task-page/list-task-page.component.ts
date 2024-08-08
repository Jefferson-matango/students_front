import { Component, OnInit, signal } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { DashboardService } from '../../services/dashboard.service';
import { Task, Datum } from '../../interfaces';

@Component({
  selector: 'app-index-all',
  templateUrl: './list-task-page.component.html',
  styleUrls: ['./list-task-page.component.css']
})
export class ListTaskPageComponent implements OnInit {
  tasks = signal<Task[]>([]);
  subjects = signal<Datum[]>([]);
  errorMessage = signal<string | undefined>(undefined);

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadSubjects();
  }

  loadTasks(): void {
    this.dashboardService.indexAll()
      .pipe(
        catchError(error => {
          this.errorMessage.set('Failed to load tasks. Please try again later.');
          Swal.fire('Error', this.errorMessage(), 'error');
          return throwError(() => new Error('Failed to load tasks'));
        })
      )
      .subscribe({
        next: (data) => {
          this.tasks.set(data);
        },
        error: (err) => {
          console.error('Error:', err);
        }
      });
  }

  loadSubjects(): void {
    this.dashboardService.getSubjects().subscribe({
      next: (data) => {
        // this.subjects.set(data); // Directly set the array of Datum
      },
    });
  }

  getSubjectName(subjectId: number): string {
    const subject = this.subjects().find(subject => subject.id === subjectId);
    return subject ? subject.name : 'Unknown';
  }

  onDelete(taskId: number): void {
    // Implement deletion logic here
    console.log('Delete task with ID:', taskId);
  }
}
