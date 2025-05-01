import { Component, NgModule, ViewChild } from "@angular/core";
import { FormsModule, NgForm, NgModel } from "@angular/forms";
import { RouterModule, RouterOutlet } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";
import { HeaderComponent } from "../header/header.component";
import { ButtonComponent } from "../button/button.component";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ButtonComponent,
    AsyncPipe,
    FormsModule,
    RouterModule,
    NgIf,
  ],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;

  model = {
    email: "",
    password: "",
  };

  constructor(private authService: AuthService) {}

  onSubmit(ngForm: NgForm): void {
    ngForm.form.markAllAsTouched();
    console.log(this.model);
    if (ngForm.valid) {
      const userLoginData = {
        email: this.model.email,
        password: this.model.password,
        name: "",
      };
      this.authService.login(userLoginData);
    }
  }
}
