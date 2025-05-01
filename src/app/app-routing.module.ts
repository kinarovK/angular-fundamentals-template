import { Routes } from "@angular/router";
import { authorizedGuard } from "./auth/guards/authorized.guard";
import { notAuthorizedGuard } from "./auth/guards/not-authorized.guard";
import { adminGuard } from "./user/guards/admin.guard";

export const routes: Routes = [
  {
    path: "login",
    loadComponent: () =>
      import("./shared/components/login-form/login-form.component").then(
        (mod) => mod.LoginFormComponent
      ),
    canActivate: [notAuthorizedGuard],
  },
  {
    path: "registration",
    loadComponent: () =>
      import(
        "./shared/components/registration-form/registration-form.component"
      ).then((mod) => mod.RegistrationFormComponent),
    canActivate: [notAuthorizedGuard],
  },
  {
    path: "courses",
    loadComponent: () =>
      import("./features/courses-list/courses-list.component").then(
        (mod) => mod.CoursesListComponent
      ),
    canMatch: [authorizedGuard],
  },
  {
    path: "courses/add",
    loadComponent: () =>
      import("./shared/components/course-form/course-form.component").then(
        (mod) => mod.CourseFormComponent
      ),
    data: {
      formType: "add",
    },
    canMatch: [authorizedGuard, adminGuard],
  },
  {
    path: "courses/:id",
    loadComponent: () =>
      import("./features/course-info/course-info.component").then(
        (mod) => mod.CourseInfoComponent
      ),
    canMatch: [authorizedGuard],
  },
  {
    path: "courses/edit/:id",
    loadComponent: () =>
      import("./shared/components/course-form/course-form.component").then(
        (mod) => mod.CourseFormComponent
      ),
    data: {
      formType: "edit",
    },
    canMatch: [authorizedGuard, adminGuard],
  },
  { path: "**", redirectTo: "/courses", pathMatch: "full" },
];
