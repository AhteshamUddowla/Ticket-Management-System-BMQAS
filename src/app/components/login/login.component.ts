import { Component, signal } from '@angular/core';
import { MaterialModule } from '../../modules/angular-material/angular-material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/authService/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  hide = signal(true);
  // errorMessage = ""

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private router: Router, private authService: AuthService) {
    // Initialize the form with default values and validators
    this.loginForm = this.fb.group({
      userCredential: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false], 
    });
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  showErrorSnackbar(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Close', {
      duration: duration,
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }

  showSuccessSnackbar(message: string, duration: number = 3000) {
    this.snackBar.open(message, 'Close', {
      duration: duration,
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }

  confirmLogin(){
      if(this.loginForm.valid){
        // const userCredential = this.loginForm.value.userCredential!;
        // const password = this.loginForm.value.password!;
        // const rememberMe = this.loginForm.value.rememberMe;

        const { userCredential, password, rememberMe } = this.loginForm.value;

        this.authService.login(userCredential, password, rememberMe).subscribe(
          (res)=>{
            if(res.success)
            {
              this.showSuccessSnackbar(res.message);
              this.router.navigate(['/tickets']);
            }else{
              // this.errorMessage = res.message;
              this.showErrorSnackbar(res.message);
            }
          },
          (error:any)=>{
            // console.log(error)
            this.showErrorSnackbar(error.message);
          }
        )
      }
    }
}
