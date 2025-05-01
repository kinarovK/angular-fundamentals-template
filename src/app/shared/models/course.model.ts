import { ApiResponse, UserResponse } from "./user.model";
import { AuthorResponse } from "./author.model";
export interface CourseReqBody {
  title: string;
  description: string;
  duration: number;
  authors: string[];
}

export interface CourseResponse extends CourseReqBody {
  id: string;
  creationDate: string;
}

export interface CourseView {
  title: string;
  description: string;
  duration: number;
  authors: AuthorResponse[];
  id: string;
  creationDate: string;
}

export interface AllCoursesResponse extends ApiResponse<CourseResponse[]> {}

export interface CreateCourseResponse extends ApiResponse<CourseResponse> {}

export interface EditCourseResponse extends ApiResponse<CourseResponse> {}

export interface SingleCourseResponse extends ApiResponse<CourseResponse> {}

export interface DeleteCourseResponse extends ApiResponse<string> {}

export interface FilteredCoursesResponse
  extends ApiResponse<CourseResponse[]> {}
