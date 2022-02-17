import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";
@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    path = 'https://angular-course-20f3b-default-rtdb.firebaseio.com/recipes.json';

    constructor(
        private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put(this.path, recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        console.log('0 ', this.authService.user);
        // !moved return this.authService.user.pipe(
        //You simply pass a number to it and I pass one here
        //and what this tells RxJS is that I only want to take one
        //value from that observable and thereafter it should 
        //automatically unsubscribe
        // !moved take(1), //We utilize this user observable, cut the user out of it
        //one time only, unsubscribe to that observable and then automatically
        //replace it with a new observable
        //exhaustMap is the new observable
        // !moved exhaustMap(//It waits for the first observable, for the user
        //observable to complete which will happen after we took the
        //latest user. Thereafter, it gives us that user, so in
        //exhaustMap we pass in a function
        // !moved user => {
        console.log('2: ', this.authService.user);
        return this.http
            .get<Recipe[]>(this.path)
            .pipe(
                map(recipes => { //map here is an rxjs/operator
                    return recipes.map(recipe => { //map here is called on an array and
                        //therefore the normal Javascript array method map
                        console.log('1');
                        return {
                            ...recipe,
                            ingredients: recipe.ingredients ? recipe.ingredients : []
                        }
                    })
                }),
                tap(recipes => {
                    console.log('3');
                    this.recipeService.setRecipes(recipes);
                })
            );
    }
}