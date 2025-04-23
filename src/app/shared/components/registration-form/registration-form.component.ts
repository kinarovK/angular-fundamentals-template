import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the form group with form controls
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getter for form controls
  get f() {
    return this.registrationForm.controls;
  }

  onLogin(): void {
    // Logic for redirecting to the login page or showing the login form
    console.log('Redirecting to login...');
  }

  // Submit handler
  onSubmit(): void {
    if (this.registrationForm.valid) {
      // Log the form values to the console
      console.log('Form Values:', this.registrationForm.value);
    } else {
      console.log('Form is invalid');
    }
    this.registrationForm.reset();
  }
}
