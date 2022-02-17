import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    //user = new Subject<User>();
    user = new BehaviorSubject<User>(null);//Behavior subject because unlike a normal subject
    //this always give us access to the previous value and that simply helps us
    //ensure that we can get access to the user even if in this part of the
    //application where we need it we missed the previous user update
    //Also gives subscribers immediate access
    //to the previously emitted value even if they haven't subscribed at the point
    //of time that value was emitted.
    //That means we can get access to be currently active user even if we only 
    //subscribe after the user has been emitted 

    //token: string = null;

    private tokenExpirationTimer: any;

    signUpPath: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBAeDbTHqMsCK0iPX02DlLQAscKJkhm0Ec';
    signInPath: string = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBAeDbTHqMsCK0iPX02DlLQAscKJkhm0Ec'

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    //Request Body Payload to FireBase
    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            this.signUpPath,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe( //I need to return an observable at the end, therefore I added 'throwError'
            catchError(
                this.handleError
            ),
            tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
        );
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            this.signInPath,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe( //I need to return an observable at the end, therefore I added 'throwError'
            catchError(
                this.handleError
            ),
            //Tap operator allows us to execute some code without altering the response
            //not disturb our subscribe function and the functions we passed as arguments
            //to subscribe
            tap(resData => {
                console.log(resData);
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                );
            })
        );
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime()
                - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        //localStorage.clear(); //If we don't have any other data
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration)
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        //Firebase return the expiresIn like a String that have the time in seconds
        //new Date().getTime() returns the current date in miliseconds
        const expirationDate = new Date(
            new Date().getTime() + expiresIn * 1000);
        const user = new User(
            email,
            userId,
            token,
            expirationDate
        );
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        console.log('JSON ', JSON.stringify(user));
        localStorage.setItem('userData', JSON.stringify(user)); //this is basically the key by which
        //you will be able to retrieve it later and then have to write some data 
        //to that key, yoy can store some data there
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'The email address is already in use by another account.';
                break;
            case 'OPERATION_NOT_ALLOWED':
                errorMessage = 'Password sign-in is disabled for this project.';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'The user may have been deleted.';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password.'
                break;
            default:
                errorMessage;
                break;
        }
        return throwError(errorMessage);
    }
}