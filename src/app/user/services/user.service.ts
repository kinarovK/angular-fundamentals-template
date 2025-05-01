import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GetUserResponse } from "@app/shared/models/user.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getUser(): Observable<GetUserResponse> {
    return this.http.get<GetUserResponse>(`${this.apiUrl}/users/me`);
  }
}
