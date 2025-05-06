import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as CoursesActions from "./courses.actions";
import * as CoursesSelectors from "./courses.selectors";
import { CoursesState } from "./courses.reducer";

@Injectable({
  providedIn: "root",
})
export class CoursesFacade {
  constructor(private store: Store<CoursesState>) {}

  isAllCoursesLoading$ = this.store.pipe(
    select(CoursesSelectors.isAllCoursesLoadingSelector)
  );
  isSingleCourseLoading$ = this.store.pipe(
    select(CoursesSelectors.isSingleCourseLoadingSelector)
  );
  isSearchingState$ = this.store.pipe(
    select(CoursesSelectors.isSearchingStateSelector)
  );
  courses$ = this.store.pipe(select(CoursesSelectors.getCourses));
  allCourses$ = this.store.pipe(select(CoursesSelectors.getAllCourses));
  course$ = this.store.pipe(select(CoursesSelectors.getCourse));
  errorMessage$ = this.store.pipe(select(CoursesSelectors.getErrorMessage));

  getAllCourses(): void {
    this.store.dispatch(CoursesActions.requestAllCourses());
  }

  getSingleCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestSingleCourse({ id }));
  }

  getFilteredCourses(searchValue: string): void {
    this.store.dispatch(
      CoursesActions.requestFilteredCourses({ title: searchValue })
    );
  }

  editCourse(body: any, id: string): void {
    this.store.dispatch(CoursesActions.requestEditCourse({ id, course: body }));
  }

  createCourse(body: any): void {
    this.store.dispatch(CoursesActions.requestCreateCourse({ course: body }));
  }

  deleteCourse(id: string): void {
    this.store.dispatch(CoursesActions.requestDeleteCourse({ id }));
  }
}
