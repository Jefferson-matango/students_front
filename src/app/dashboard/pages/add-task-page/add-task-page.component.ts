import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { DashboardService } from '../../services/dashboard.service';
import { Datum } from '../../interfaces';
import { TaskRequest } from '../../interfaces/task-request.interface';

@Component({
  selector: 'app-create-task',
  templateUrl: './add-task-page.component.html',
  styleUrls: ['./add-task-page.component.css']
})
export class AddTaskPageComponent implements OnInit {
  taskForm!: FormGroup;
  subjects: Datum[] = [];
  formSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {  }

  ngOnInit(): void {
    this.initForm();
    this.loadSubjects();
  }

  initForm(): void {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      state: [true],
      subject_id: [null, Validators.required]
    });
  }

  loadSubjects(): void {
    this.dashboardService.getSubjects().subscribe(response => {
      this.subjects = response.data;
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.taskForm.invalid) {
      return;
    }

    const data: TaskRequest = this.taskForm.value;

    this.dashboardService.storeTasks(data).subscribe({
      next: (response) => {
        this.showAlertConfirm()
        this.taskForm.reset();
      },
      error: (error) => {
        Swal.fire('Error', 'Algo salio mal, vuelvalo a intentar :(', 'error');
      }
    });
  }

  showAlertConfirm() {
      Swal.fire({
        title: 'Creado',
        text: 'La tarea se ha creado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });
  }
  onCancel(): void {
    this.taskForm.reset();
  }
}
