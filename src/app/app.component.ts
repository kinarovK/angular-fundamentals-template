import { Component, Input } from "@angular/core";
import { Observable, of } from "rxjs";
import { mockedCoursesList } from "./shared/mocks/mocks";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "courses-app";
  @Input() text: string | undefined = "Harry Plotter";
  courses: any[] = [];

  ngOnInit(): void {
    this.getCourses().subscribe({
      next: (courses) => (this.courses = courses),
      error: (err) => console.error("Error loading courses:", err),
    });
  }

  getCourses(): Observable<any[]> {
    return of(mockedCoursesList);
  }
}

interface Course {
  title: string;
  description: string;
  creationDate: string;
  duration: string;
  authors: string[];
}
