import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CourseResponse } from "@app/shared/models/course.model";
import { combineLatestWith } from "rxjs";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { CustomDatePipe } from "../../shared/pipes/custom-date.pipe";
import { DurationPipe } from "../../shared/pipes/duration.pipe";
import { AsyncPipe, NgIf } from "@angular/common";
import { CoursesFacade } from "@app/store/courses/courses.facade";
import { publishFacade } from "@angular/compiler";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
  standalone: true,
  imports: [ButtonComponent, DurationPipe, CustomDatePipe, AsyncPipe, NgIf],
})
export class CourseInfoComponent {
  constructor(
    private coursesStore: CoursesStoreService,
    private router: Router,
    public coursesFacade: CoursesFacade
  ) {}

  @Input() id = "";

  course$ = this.coursesFacade.course$;

  onBack(): void {
    this.router.navigate(["/courses"]);
  }
}
