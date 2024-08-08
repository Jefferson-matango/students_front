import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  public ERROR = false;

  private fb = inject( FormBuilder );
  private authService = inject(AuthService);

  public registerForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', [Validators.required, Validators.minLength(8)]],
  });

  register() {

    if(this.registerForm.valid) {

      this.ERROR = false;

      const {name, email, password, password_confirmation} = this.registerForm.value;

      this.authService.register(name, email, password, password_confirmation)
        .subscribe( (resp) => {
          if(resp){
            this.showAlertConfirm()
          } else {
            this.ERROR = true
            this.showAlertError()
          }
        }, error => {
          console.log(error)
        }
      )
    }
  }

  showAlertConfirm() {
    if (!this.ERROR) {
      Swal.fire({
        title: 'Registro Exitoso',
        text: 'El usuario se ha creado exitosamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      });      
    }
  }
  showAlertError() {
    if (this.ERROR) {
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema con el registro. Por favor, inténtelo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
