import { inject, Injectable } from '@angular/core';
import { URL_SERVICES } from '../../config/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Task, TaskResponse } from '../interfaces';
import { AuthService } from '../../auth/services/auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import { TaskRequest } from '../interfaces/task-request.interface';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly baseUrl: string = URL_SERVICES;
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  indexAll(): Observable<Task[]> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    const URL = `${this.baseUrl}/tasks`;
    return this.http.get<Task[]>(URL, { headers: headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching tasks:', error);
          return throwError(() => new Error('Error fetching tasks'));
        })
      );
  }

  listTasks(subject_id: string): Observable<Task[]> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    const URL = `${this.baseUrl}/subjects/${subject_id}/tasks`;
    return this.http.get<Task[]>(URL, { headers: headers })
      .pipe(
        catchError(error => {
          console.error('Error listing tasks:', error);
          return throwError(() => new Error('Error listing tasks'));
        })
      );
  }

  showTasks(subject_id: string, id: string): Observable<Task> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    const URL = `${this.baseUrl}/subjects/${subject_id}/tasks/${id}`;
    return this.http.get<Task>(URL, { headers: headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching task:', error);
          return throwError(() => new Error('Error fetching task'));
        })
      );
  }

  storeTasks(data: TaskRequest): Observable<TaskResponse> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    const URL = `${this.baseUrl}/subjects/${data.subject_id}/tasks`;
    return this.http.post<TaskResponse>(URL, data, { headers: headers })
      .pipe(
        catchError(error => {
          console.error('Error storing task:', error);
          return throwError(() => new Error('Error storing task'));
        })
      );
  }

  editTasks(data: Task, subject_id: string, id: string): Observable<TaskResponse> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    const URL = `${this.baseUrl}/subjects/${subject_id}/tasks/${id}`;
    return this.http.put<TaskResponse>(URL, data, { headers: headers })
      .pipe(
        catchError(error => {
          console.error('Error editing task:', error);
          return throwError(() => new Error('Error editing task'));
        })
      );
  }

  deleteTasks(subject_id: string, id: string): Observable<void> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    const URL = `${this.baseUrl}/subjects/${subject_id}/tasks/${id}`;
    return this.http.delete<void>(URL, { headers: headers })
      .pipe(
        catchError(error => {
          console.error('Error deleting task:', error);
          return throwError(() => new Error('Error deleting task'));
        })
      );
  }

  getSubjects(): Observable<Subject> {
    const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authService.token });
    const URL = `${this.baseUrl}/subjects`;
    return this.http.get<Subject>(URL, { headers: headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching subjects:', error);
          return throwError(() => new Error('Error fetching subjects'));
        })
      );
  }  
}
