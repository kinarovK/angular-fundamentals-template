import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  LoginResponse,
  RegistrationResponse,
  User,
} from "@app/shared/models/user.model";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { SessionStorageService } from "./session-storage.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isAuthorized$$ = new BehaviorSubject<boolean>(false);
  isAuthorized$ = this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) {}

  register(user: User): void {
    this.http
      .post<RegistrationResponse>(`${this.apiUrl}/register`, user)
      .subscribe({
        next: () => {
          this.login(user);
        },
        error: (error) => {
          console.error("Registration failed:", error);
          throw new Error(error);
        },
      });
  }

  login(user: User): void {
    this.http.post<LoginResponse>(`${this.apiUrl}/login`, user).subscribe({
      next: (res) => {
        const { result } = res;
        if (result) {
          this.sessionStorageService.setToken(result);
          this.isAuthorised = true;
          this.router.navigate(["/courses"]);
        }
      },
      error: (error) => {
        console.error("Login failed:", error);
        throw new Error(error);
      },
    });
  }

  logout(): void {
    this.http
      .delete(`${this.apiUrl}/logout`, {
        observe: "response",
      })
      .subscribe({
        next: (res) => {
          if (res.ok) {
            this.sessionStorageService.deleteToken();
            this.isAuthorised = false;
            this.router.navigate([this.getLoginUrl()]);
          }
        },
        error: (error) => {
          console.error("Logout failed:", error);
          throw new Error(error);
        },
      });
  }

  get isAuthorised(): boolean {
    return this.isAuthorized$$.value;
  }

  set isAuthorised(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl(): string {
    return `/login`;
  }
}
