export interface ApiResponse<T> {
  successful: boolean;
  result?: T;
  errors?: string[];
}
export interface User {
  name: string;
  email: string;
  password: string;
}
export interface UserResponse extends User {
  role: "user" | "admin";
  id: string;
}

export interface LoginResponse extends ApiResponse<string> {
  user: User;
}

export interface RegistrationResponse extends ApiResponse<string> {}

export interface GetUserResponse extends ApiResponse<UserResponse> {}
