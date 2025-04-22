import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent {
  public registrationForm = new FormGroup({
    name: new FormControl("", [
      Validators.required,
      Validators.minLength(6), // Changed from 6 to match error message
    ]),
    email: new FormControl("", [
      Validators.required, // Added required validator
      Validators.email, // Added email format validator
    ]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8), // Added password validation
    ]),
  });

  public handleValue(): void {
    if (this.registrationForm.valid) {
      console.log("Form is valid:", this.registrationForm.value);
    } else {
      this.registrationForm.markAllAsTouched();
      alert("Please fix the errors in the form");
    }
  }
}
