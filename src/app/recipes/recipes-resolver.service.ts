import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/data-storage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({
    providedIn: 'root'
})

//Resolver is essentially some code that runs before a route is loaded to
//ensure that certain data the route depends on is there
export class RecipesResolverService implements Resolve<Recipe[]>{

    constructor(
        private dataStorageService: DataStorageService,
        private recipesService: RecipeService
    ) { }

    //resolver, this Angular feature will subscribe for me to basically find
    //out once the data is there
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log('Resolver!');
        const recipes = this.recipesService.getRecipes();

        if (recipes.length === 0) {
            console.log('Recipes length = 0!');
            return this.dataStorageService.fetchRecipes();
        } else {
            return recipes;
        }
    }

}