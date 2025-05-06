import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CoursesService } from "@app/services/courses.service";
import { CourseResponse } from "@app/shared/models/course.model";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  exhaustMap,
  map,
  catchError,
  of,
  switchMap,
  forkJoin,
  mergeMap,
} from "rxjs";
import * as CoursesActions from "./courses.actions";

@Injectable()
export class CoursesEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private router: Router
  ) {}

  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestAllCourses),
      exhaustMap(() =>
        this.coursesService.getAll().pipe(
          map((res) =>
            CoursesActions.requestAllCoursesSuccess({
              courses: res.result || [],
            })
          ),
          catchError((error) =>
            of(CoursesActions.requestAllCoursesFail({ error }))
          )
        )
      )
    )
  );

  filteredCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestFilteredCourses),
      switchMap((action) => {
        const { title } = action;

        const titleQuery = `title=${title}`;
        const durationQuery = `duration=${title}`;
        const descriptionQuery = `description=${title}`;
        const creationDateQuery = `creationDate=${title}`;

        const titleSearch$ = this.coursesService.filterCourses(titleQuery);
        const durationSearch$ =
          this.coursesService.filterCourses(durationQuery);
        const descriptionSearch$ =
          this.coursesService.filterCourses(descriptionQuery);
        const creationDateSearch$ =
          this.coursesService.filterCourses(creationDateQuery);

        return forkJoin([
          titleSearch$,
          durationSearch$,
          descriptionSearch$,
          creationDateSearch$,
        ]).pipe(
          map((results) => {
            const combinedResults = results.flatMap((el) => el.result || []);
            combinedResults.sort((a, b) => a.id.localeCompare(b.id));
            const uniqueResults = combinedResults.reduce(
              (acc: CourseResponse[], el: CourseResponse, i: number) => {
                if (
                  i === 0 ||
                  (i >= 1 && el.id !== combinedResults[i - 1].id)
                ) {
                  return [...acc, el];
                }

                return acc;
              },
              []
            );

            return CoursesActions.requestFilteredCoursesSuccess({
              courses: uniqueResults,
            });
          }),
          catchError((error) =>
            of(CoursesActions.requestFilteredCoursesFail({ error }))
          )
        );
      })
    )
  );

  getSpecificCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestSingleCourse),
      mergeMap((action) =>
        this.coursesService.getCourse(action.id).pipe(
          map((res) =>
            CoursesActions.requestSingleCourseSuccess({ course: res.result! })
          ),
          catchError((error) =>
            of(CoursesActions.requestSingleCourseFail({ error }))
          )
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestDeleteCourse),
      mergeMap((action) =>
        this.coursesService.deleteCourse(action.id).pipe(
          switchMap(() => [CoursesActions.requestAllCourses()]),
          catchError((error) =>
            of(CoursesActions.requestDeleteCourseFail({ error }))
          )
        )
      )
    )
  );

  editCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestEditCourse),
      mergeMap((action) =>
        this.coursesService.editCourse(action.id, action.course).pipe(
          map(() =>
            CoursesActions.requestEditCourseSuccess({ course: action.course })
          ),
          catchError((error) =>
            of(CoursesActions.requestEditCourseFail({ error }))
          )
        )
      )
    )
  );

  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CoursesActions.requestCreateCourse),
      mergeMap((action) =>
        this.coursesService.createCourse(action.course).pipe(
          map(() =>
            CoursesActions.requestCreateCourseSuccess({ course: action.course })
          ),
          catchError((error) =>
            of(CoursesActions.requestCreateCourseFail({ error }))
          )
        )
      )
    )
  );

  redirectToTheCoursesPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          CoursesActions.requestCreateCourseSuccess,
          CoursesActions.requestEditCourseSuccess,
          CoursesActions.requestSingleCourseFail
        ),
        map(() => this.router.navigate(["/courses"]))
      ),
    { dispatch: false }
  );
}
