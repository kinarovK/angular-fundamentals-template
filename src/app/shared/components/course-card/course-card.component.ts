import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Course } from "@app/services/course.model";
import { CoursesService } from "@app/services/courses.service";
import { map, pipe } from "rxjs";
import { mockedCoursesList } from "@app/shared/mocks/mocks";
@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Input() courses: Course[] = mockedCoursesList;
  allCourseArray: any[] = [];

  @Input() title: string = "";
  @Input() description: string = "";
  @Input() creationDate!: Date | string;
  @Input() duration!: number;
  @Input() authors: string[] = [];
  @Input() editable: boolean = false;

  @Output() clickOnShow = new EventEmitter<void>();

  constructor(private firebaseService: CoursesService) {}
  ngOnInit() {
    this.courses = this.getAllCourses();
  }

  getAllCourses() {
    return mockedCoursesList;
  }

  onShowCourse(): void {
    this.clickOnShow.emit();
  }

  updateCourseArrayWithFilteredCourses(filteredCourses: Course[]) {
    if (filteredCourses && filteredCourses.length > 0) {
      this.allCourseArray = filteredCourses;
    } else {
      this.allCourseArray = [...this.allCourseArray];
    }
  }

  onShowCourseClick(course: Course): void {
    console.log("Show Course button clicked", course);
    // Add your logic here
  }

  onTrashClick(courseId: string): any {
    console.log("Trash button clicked", courseId);
  }

  onEditClick(): void {
    console.log("Edit button clicked");
    // Add your logic here
  }
}
