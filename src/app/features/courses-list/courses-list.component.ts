import { AsyncPipe, NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CourseResponse } from "@app/shared/models/course.model";
import { UserStoreService } from "@app/user/services/user-store.service";
import { combineLatestWith } from "rxjs";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { CourseCardComponent } from "../../shared/components/course-card/course-card.component";
import { SearchComponent } from "../../shared/components/search/search.component";

@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
  standalone: true,
  imports: [
    SearchComponent,
    ButtonComponent,
    NgFor,
    CourseCardComponent,
    NgIf,
    AsyncPipe,
  ],
})
export class CoursesListComponent {
  constructor(
    private router: Router,
    private coursesStore: CoursesStoreService,
    private userStore: UserStoreService
  ) {}

  courses: CourseResponse[] = [];
  editable = this.userStore.isAdmin;

  ngOnInit(): void {
    this.subscribeToServives();
  }

  private subscribeToServives(): void {
    this.coursesStore.courses$
      .pipe(combineLatestWith(this.coursesStore.authors$))
      .subscribe(([courses, authors]) => {
        this.courses = courses.map((course) => ({
          ...course,
          authors: authors
            .filter(({ id }) => course.authors.includes(id))
            .map(({ name }) => name),
        }));
      });

    this.coursesStore.getAll();
    this.coursesStore.getAllAuthors();
  }

  showCourse(courseId: string): void {
    this.coursesStore.getCourse(courseId);
    this.router.navigate(["/courses", courseId]);
  }

  addCourse(): void {
    this.router.navigate(["/courses/add"]);
  }

  editCourse(id: string): void {
    this.router.navigate(["/courses/edit", id]);
  }

  deleteCourse(id: string): void {
    this.coursesStore.deleteCourse(id);
  }

  searchCourse(event: string): void {
    this.coursesStore.filterCourses(event);
  }

  trackByCourses(index: number, course: CourseResponse): string {
    return course.id;
  }
}
