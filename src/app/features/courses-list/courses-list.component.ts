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
import { CoursesFacade } from "@app/store/courses/courses.facade";

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
    private userStore: UserStoreService,
    public coursesFacade: CoursesFacade
  ) {}

  editable = this.userStore.isAdmin;
  courses$ = this.coursesFacade.allCourses$;

  ngOnInit(): void {
    this.subscribeToServives();
  }

  private subscribeToServives(): void {
    this.coursesFacade.getAllCourses();
  }

  showCourse(courseId: string): void {
    this.coursesFacade.getSingleCourse(courseId);
    this.router.navigate(["/courses", courseId]);
  }

  addCourse(): void {
    this.router.navigate(["/courses/add"]);
  }

  editCourse(id: string): void {
    this.coursesFacade.getSingleCourse(id);
    this.router.navigate(["/courses/edit", id]);
  }

  deleteCourse(id: string): void {
    this.coursesFacade.deleteCourse(id);
  }

  searchCourse(event: string): void {
    this.coursesFacade.getFilteredCourses(event);
  }

  trackByCourses(index: number, course: CourseResponse): string {
    return course.id;
  }
}
