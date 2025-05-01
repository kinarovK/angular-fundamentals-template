import { Component } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { emailValidator } from "@app/shared/directives/email.directive";
import { ButtonComponent } from "../button/button.component";
import { NgIf } from "@angular/common";
import { RouterLink, RouterModule } from "@angular/router";
@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
  standalone: true,
  imports: [
    ButtonComponent,
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    RouterModule,
  ],
})
export class RegistrationFormComponent {
  public registrationForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required]],
      password: ["", Validators.required],
    });
  }
  get name() {
    return this.registrationForm.get("name");
  }

  get email() {
    return this.registrationForm.get("email");
  }

  get password() {
    return this.registrationForm.get("password");
  }
  onSubmit(): void {
    this.registrationForm.markAllAsTouched();
    console.log(this.registrationForm.value);
  }
}
