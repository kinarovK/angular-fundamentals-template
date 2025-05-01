import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { mockedCoursesList } from "@app/shared/mocks/mocks";
import {
  AllAuthorsResponse,
  AuthorReqBody,
  CreateAuthorResponse,
  SingleAuthorResponse,
} from "@app/shared/models/author.model";
import {
  AllCoursesResponse,
  CourseReqBody,
  CreateCourseResponse,
  DeleteCourseResponse,
  EditCourseResponse,
  FilteredCoursesResponse,
  SingleCourseResponse,
} from "@app/shared/models/course.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<AllCoursesResponse>(`${this.apiUrl}/courses/all`);
  }

  createCourse(course: CourseReqBody): Observable<CreateCourseResponse> {
    return this.http.post<CreateCourseResponse>(
      `${this.apiUrl}/courses/add`,
      course
    );
  }

  editCourse(
    id: string,
    course: CourseReqBody
  ): Observable<EditCourseResponse> {
    return this.http.put<EditCourseResponse>(
      `${this.apiUrl}/courses/${id}`,
      course
    );
  }

  getCourse(id: string): Observable<SingleCourseResponse> {
    return this.http.get<SingleCourseResponse>(`${this.apiUrl}/courses/${id}`);
  }

  deleteCourse(id: string): Observable<DeleteCourseResponse> {
    return this.http.delete<DeleteCourseResponse>(
      `${this.apiUrl}/courses/${id}`
    );
  }

  filterCourses(value: string): Observable<FilteredCoursesResponse> {
    const params = new HttpParams({ fromString: value });
    return this.http.get<FilteredCoursesResponse>(
      `${this.apiUrl}/courses/filter`,
      { params }
    );
  }

  getAllAuthors(): Observable<AllAuthorsResponse> {
    return this.http.get<AllAuthorsResponse>(`${this.apiUrl}/authors/all`);
  }

  createAuthor(name: string): Observable<CreateAuthorResponse> {
    const reqBody: AuthorReqBody = { name };
    return this.http.post<CreateAuthorResponse>(
      `${this.apiUrl}/authors/add`,
      reqBody
    );
  }

  getAuthorById(id: string): Observable<SingleAuthorResponse> {
    return this.http.get<SingleAuthorResponse>(`${this.apiUrl}/authors/${id}`);
  }
}
