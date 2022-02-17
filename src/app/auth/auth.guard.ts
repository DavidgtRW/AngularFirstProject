import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable(
    { providedIn: 'root' }
)
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {

        return this.authService.user
            .pipe(
                take(1),//To make sure that we always just take the least user value
                    //and then unsubscribe for this guard execution so that we don't
                    //have an ongoing listener to taht which we really don't need and
                    //therefore here, you need to import the take operator
                map(user => {
                    const isAuth = !!user;
                    if (isAuth) {
                        return true;
                    }
                    return this.router.createUrlTree(['/auth']);
                }),
                //Approach to previous Angular versions
                // tap(isAuth => {
                //     if (!isAuth) {
                //         this.router.navigate(['/auth']);
                //     }
                // })
            );
    }
}