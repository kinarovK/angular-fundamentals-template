import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm!: FormGroup;
  emailError: string | null = null;
  passwordError: string | null = null;
  userName: string | null = null; // Add this line

  @Output() loggedIn: EventEmitter<string> = new EventEmitter<string>();



  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]], 
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onRegister(): void {
    console.log('Redirecting to registration...');
  }

  resetEmailError(): void {
    this.emailError = null; 
  }
  
  resetPasswordError(): void {
    this.passwordError = null; 
  }
  
  onSubmit(): void {
    this.emailError = null;
    this.passwordError = null;

    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const username = this.authService.authenticate(email, password);

      if (username) {
        // Successful login
        this.userName = username;
        this.loggedIn.emit(username);
        alert(`Login successful! Welcome, ${username}.`);
        this.loginForm.reset();
      } else {
        // Show error messages
        this.emailError = 'Invalid email'; 
        this.passwordError = 'Invalid password';
      }
    } else {
      // Display specific error messages
      if (this.f['email'].errors?.['required'] ) {
        this.emailError = 'Email is required.';
      } else if (this.f['email'].errors?.['email']) {
        this.emailError = 'Email is not valid.';
      }
      if (this.f['password'].errors?.['required']) {
        this.passwordError = 'Password is required.';
      }
    }
  }
}
