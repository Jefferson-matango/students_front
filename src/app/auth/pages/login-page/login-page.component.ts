import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  public ERROR = false;

  private fb = inject( FormBuilder );
  private authService = inject(AuthService);
  private router = inject (Router)

  ngOnInit(): void {
    if(localStorage.getItem('authenticated')){
      localStorage.removeItem('authenticated')
    }
  }

  public loginForm: FormGroup = this.fb.group({
    email: ['', [ Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  login() {

    if (this.loginForm.valid){
      this.ERROR = false;
      
      const {email, password} = this.loginForm.value;
  
      this.authService.login( email, password )
        .subscribe( resp => {
          if (resp){
            this.router.navigate(['/dashboard']);
          } else {
            this.ERROR = true
            this.showAlert()
          }
        }, error => {
          console.log(error)
        }
      )
    }
  }

  showAlert() {
    if (this.ERROR) {
      Swal.fire({
        title: 'Error',
        text: 'El correo y la contraseña son incorrectos. Por favor, inténtelo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
  }
}
