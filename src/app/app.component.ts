import { Component, Input } from "@angular/core";
import { Observable, of } from "rxjs";
import { mockedCoursesList } from "./shared/mocks/mocks";
import { Router, RouterOutlet } from "@angular/router";
import { ButtonComponent, HeaderComponent } from "./shared/components";
import { AsyncPipe } from "@angular/common";
import { AuthService } from "./auth/services/auth.service";
import { UserStoreService } from "./user/services/user-store.service";
import { bootstrapApplication } from "@angular/platform-browser";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, ButtonComponent, AsyncPipe],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private userStoreService: UserStoreService,
    private router: Router
  ) {}

  title = "courses-app";
  @Input() text: string | undefined = "Harry Plotter";
  courses: any[] = [];

  ngOnInit(): void {
    this.subscribeToServices();
  }

  private subscribeToServices(): void {
    this.authService.isAuthorized$.subscribe((isAuthorozied) => {
      if (isAuthorozied) {
        this.userStoreService.getUser();
      }
    });
  }

  get buttonText(): string {
    return this.authService.isAuthorised ? "Log out" : "Log in";
  }

  get userName(): Observable<string> {
    return this.userStoreService.name$;
  }

  getCourses(): Observable<any[]> {
    return of(mockedCoursesList);
  }
  onButtonClick(): void {
    if (this.authService.isAuthorised) {
      this.authService.logout();
    } else {
      this.router.navigate(["/login"]);
    }
  }
}

interface Course {
  title: string;
  description: string;
  creationDate: string;
  duration: string;
  authors: string[];
}
