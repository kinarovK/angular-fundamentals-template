import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { CourseResponse } from "@app/shared/models/course.model";
import { combineLatestWith } from "rxjs";
import { ButtonComponent } from "../../shared/components/button/button.component";
import { CustomDatePipe } from "../../shared/pipes/custom-date.pipe";
import { DurationPipe } from "../../shared/pipes/duration.pipe";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
  standalone: true,
  imports: [ButtonComponent, DurationPipe, CustomDatePipe],
})
export class CourseInfoComponent {
  constructor(
    private coursesStore: CoursesStoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscribeToServives();
  }

  @Input() id = "";

  course: CourseResponse = {
    id: "",
    title: "",
    description: "",
    creationDate: "",
    duration: 0,
    authors: [],
  };

  private subscribeToServives(): void {
    this.coursesStore.courses$
      .pipe(combineLatestWith(this.coursesStore.authors$))
      .subscribe(([courses, authors]) => {
        this.course = {
          ...courses[0],
          authors: authors
            .filter(({ id }) => courses[0].authors.includes(id))
            .map(({ name }) => name),
        };
      });
  }

  onBack(): void {
    this.router.navigate(["/courses"]);
  }
}
