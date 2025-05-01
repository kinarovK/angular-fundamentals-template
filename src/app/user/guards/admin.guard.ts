import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UserStoreService } from "../services/user-store.service";

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userStoreService = inject(UserStoreService);

  if (userStoreService.isAdmin) {
    return true;
  }

  return router.parseUrl("/courses");
};
