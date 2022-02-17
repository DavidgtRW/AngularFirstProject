import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

    isAuthenticated = false;
    collapsed = true;

    private userSub: Subscription;

    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService
    ) { }


    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.

        console.log('HeaderComponent');
        this.userSub = this.authService.user.subscribe(
            user => {
                this.isAuthenticated = !!user; //I get true when we have a user
                //and false if we have no user
                //this.isAuthenticated = !user ? false : true; 
                console.log(user);
                console.log(!user);
                console.log(!!user);
            }
        );
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }

    ngOnDestroy(): void {
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        console.log('onDestroy');
        this.userSub.unsubscribe();
    }

}