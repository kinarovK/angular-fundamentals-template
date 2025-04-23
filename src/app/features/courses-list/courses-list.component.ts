import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseView } from '@app/shared/models/courseView.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
})
export class CoursesListComponent {
  @Input() courses: CourseView[] = [];
  @Input() editable = false;

  @Output() showCourseEvent = new EventEmitter<string>();
  @Output() editCourseEvent = new EventEmitter<string>();
  @Output() deleteCourseEvent = new EventEmitter<string>();

  showCourse(id: string): void {
    this.showCourseEvent.emit(id);
  }

  editCourse(event: string): void {
    this.editCourseEvent.emit(event);
  }

  deleteCourse(event: string): void {
    this.deleteCourseEvent.emit(event);
  }

  searchCourse(event: string): void {
    console.log('search', event);
  }

  trackByCourses(index: number, course: CourseView): string {
    return course.id;
  }
}
