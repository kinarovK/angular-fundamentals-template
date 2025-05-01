import { ApiResponse } from "./common.model";

export interface AuthorReqBody {
  name: string;
}

export interface AuthorResponse extends AuthorReqBody {
  id: string;
}

export interface AuthorView extends AuthorReqBody {
  id: string;
}

export interface AllAuthorsResponse extends ApiResponse<AuthorResponse[]> {}

export interface CreateAuthorResponse extends ApiResponse<AuthorResponse> {}

export interface SingleAuthorResponse extends ApiResponse<AuthorResponse> {}

export interface DeleteAuthorResponse extends ApiResponse<string> {}
