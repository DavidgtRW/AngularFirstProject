import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})

export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        private authService: AuthService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        return this.authService.user.pipe(
            //You simply pass a number to it and I pass one here
            //and what this tells RxJS is that I only want to take one
            //value from that observable and thereafter it should 
            //automatically unsubscribe
            take(1), //We utilize this user observable, cut the user out of it
            //one time only, unsubscribe to that observable and then automatically
            //replace it with a new observable
            //exhaustMap is the new observable
            exhaustMap(//It waits for the first observable, for the user
                //observable to complete which will happen after we took the
                //latest user. Thereafter, it gives us that user, so in
                //exhaustMap we pass in a function
                user => {
                    //... 
                    //we can edit the request based on the user here now,
                    //and we return this overall chain which just as before will be
                    //a chain taht in the end has this handle observable being returned
                    //because we swapped the user observable with that one in the map
                    //function
                    if(!user){
                        return next.handle(req);
                    }
                    const modifiedReq = req.clone(
                        {
                            params: new HttpParams()
                                .set(
                                    'auth',user.token
                                )
                        }
                    );
                    return next.handle(modifiedReq);
                }
            )
        );
    }



}