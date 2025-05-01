import { Injectable } from "@angular/core";
import { GetUserResponse, UserResponse } from "@app/shared/models/user.model";
import { BehaviorSubject } from "rxjs";
import { UserService } from "./user.service";

function isUserReponse(
  result: UserResponse | undefined
): result is UserResponse {
  return (
    !!result &&
    typeof result == "object" &&
    "role" in result &&
    "name" in result
  );
}

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private isAdmin$$ = new BehaviorSubject<boolean>(false);
  isAdmin$ = this.isAdmin$$.asObservable();

  private name$$ = new BehaviorSubject<string>("");
  name$ = this.name$$.asObservable();

  constructor(private userService: UserService) {}
  getUser(): void {
    this.userService.getUser().subscribe((res: GetUserResponse) => {
      if (res.successful && isUserReponse(res.result)) {
        const { name, role } = res.result;
        this.name$$.next(name);
        this.isAdmin = role === "admin";
      }
    });
  }

  get isAdmin() {
    return this.isAdmin$$.value;
  }

  set isAdmin(value: boolean) {
    this.isAdmin$$.next(value);
  }
}
