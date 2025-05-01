import { Injectable } from "@angular/core";
import { AuthorResponse } from "@app/shared/models/author.model";
import { CourseReqBody, CourseResponse } from "@app/shared/models/course.model";
import { BehaviorSubject, forkJoin } from "rxjs";
import { CoursesService } from "./courses.service";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private isLoading$$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoading$$.asObservable();

  private courses$$ = new BehaviorSubject<CourseResponse[]>([]);
  courses$ = this.courses$$.asObservable();

  private authors$$ = new BehaviorSubject<AuthorResponse[]>([]);
  authors$ = this.authors$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll(): void {
    this.isLoading$$.next(true);
    this.coursesService.getAll().subscribe({
      next: (res) => {
        this.courses$$.next(res.result || []);
        this.isLoading$$.next(false);
      },
      error: (error) => {
        console.error("Error fetching courses", error);
        this.isLoading$$.next(false);
      },
    });
  }
  createCourse(course: CourseReqBody): void {
    this.isLoading$$.next(true);
    this.coursesService.createCourse(course).subscribe({
      next: (res) => {
        const currentCourses = [...this.courses$$.value];
        currentCourses.push(res.result!);
        this.courses$$.next(currentCourses);
        this.isLoading$$.next(false);
      },
      error: (error) => {
        console.error("Error creating course", error);
        this.isLoading$$.next(false);
      },
    });
  }

  getCourse(id: string): void {
    this.isLoading$$.next(true);
    this.coursesService.getCourse(id).subscribe({
      next: (res) => {
        this.courses$$.next([res.result!]);
        this.isLoading$$.next(false);
      },
      error: (error) => {
        console.error("Error fetching course", error);
        this.isLoading$$.next(false);
      },
    });
  }

  editCourse(id: string, course: CourseReqBody): void {
    this.isLoading$$.next(true);
    this.coursesService.editCourse(id, course).subscribe({
      next: (res) => {
        const currentCourses = [...this.courses$$.value];
        const updatedIndex = currentCourses.findIndex((c) => c.id === id);
        currentCourses[updatedIndex] = res.result!;
        this.courses$$.next(currentCourses);
        this.isLoading$$.next(false);
      },
      error: (error) => {
        console.error("Error editing course", error);
        this.isLoading$$.next(false);
      },
    });
  }
  deleteCourse(id: string): void {
    this.isLoading$$.next(true);
    this.coursesService.deleteCourse(id).subscribe({
      next: () => {
        const currentCourses = this.courses$$.value.filter((c) => c.id !== id);
        this.courses$$.next(currentCourses);
        this.isLoading$$.next(false);
      },
      error: (error) => {
        console.error("Error deleting course", error);
        this.isLoading$$.next(false);
      },
    });
  }
  filterCourses(value: string): void {
    this.isLoading$$.next(true);

    const titleQuery = `title=${value}`;
    const durationQuery = `duration=${value}`;
    const descriptionQuery = `description=${value}`;
    const creationDateQuery = `creationDate=${value}`;

    const titleSearch$ = this.coursesService.filterCourses(titleQuery);
    const durationSearch$ = this.coursesService.filterCourses(durationQuery);
    const descriptionSearch$ =
      this.coursesService.filterCourses(descriptionQuery);
    const creationDateSearch$ =
      this.coursesService.filterCourses(creationDateQuery);

    forkJoin([
      titleSearch$,
      durationSearch$,
      descriptionSearch$,
      creationDateSearch$,
    ]).subscribe({
      next: (results) => {
        const combinedResults = results.flatMap((el) => el.result || []);
        combinedResults.sort((a, b) => a.id.localeCompare(b.id));
        const uniqueResults = combinedResults.reduce(
          (acc: CourseResponse[], el: CourseResponse, i: number) => {
            if (i === 0 || (i >= 1 && el.id !== combinedResults[i - 1].id)) {
              return [...acc, el];
            }

            return acc;
          },
          []
        );

        this.courses$$.next(uniqueResults);
        this.isLoading$$.next(false);
      },
      error: (error) => {
        console.error("Error filtering courses", error);
        this.isLoading$$.next(false);
      },
    });
  }

  getAllAuthors(): void {
    this.isLoading$$.next(true);
    this.coursesService.getAllAuthors().subscribe({
      next: (res) => {
        this.authors$$.next(res.result || []);
        this.isLoading$$.next(false);
      },
      error: (error) => {
        console.error("Error fetching authors", error);
        this.isLoading$$.next(false);
      },
    });
  }

  createAuthor(name: string): void {
    this.isLoading$$.next(true);
    this.coursesService.createAuthor(name).subscribe({
      next: (res) => {
        const currentAuthors = [...this.authors$$.value];
        currentAuthors.push(res.result!);
        this.authors$$.next(currentAuthors);
        this.isLoading$$.next(false);
      },
      error: (error) => {
        console.error("Error creating author", error);
        this.isLoading$$.next(false);
      },
    });
  }

  getAuthorById(id: string): void {
    this.isLoading$$.next(true);
    this.coursesService.getAuthorById(id).subscribe({
      next: (res) => {
        this.authors$$.next([res.result!]);
        this.isLoading$$.next(false);
      },
      error: (error) => {
        console.error("Error fetching author", error);
        this.isLoading$$.next(false);
      },
    });
  }
}
