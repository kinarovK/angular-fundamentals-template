import { Component } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.registrationForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      console.log("Form Submitted Successfully:", this.registrationForm.value);
    } else {
      this.registrationForm.markAllAsTouched();
    }
  }
}
