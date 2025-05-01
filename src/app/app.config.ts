import { ApplicationConfig, BrowserModule } from "@angular/platform-browser";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { routes } from "./app-routing.module";
import { provideRouter } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { tokenInterceptor } from "./auth/interceptors/token.interceptor";
import { AuthService } from "./auth/services/auth.service";
import { CoursesService } from "./services/courses.service";
import { CoursesStoreService } from "./services/courses-store.service";
import { SessionStorageService } from "./auth/services/session-storage.service";
import { UserService } from "./user/services/user.service";
import { UserStoreService } from "./user/services/user-store.service";
import { importProvidersFrom } from "@angular/core";

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule, FontAwesomeModule),
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    AuthService,
    CoursesService,
    CoursesStoreService,
    SessionStorageService,
    UserService,
    UserStoreService,
  ],
};
