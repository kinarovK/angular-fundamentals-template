export interface ApiResponse<T> {
  successful: boolean;
  result?: T;
  errors?: string[];
}
