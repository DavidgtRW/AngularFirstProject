import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {


  recipesChanged = new Subject<Recipe[]>();

  // private recipes : Recipe[] = [
  //     new Recipe('Tasty Schnitzel', 'A super-tasty Schnitzel', 'https://cdn.pixabay.com/photo/2020/07/01/13/28/wiener-schnitzel-5359641_960_720.jpg',
  //         [
  //             new Ingredient('Meat', 1),
  //             new Ingredient('French Fries', 20)
  //         ]),
  //     new Recipe('Big Fat Burger', 'What else you need to say?', 'https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg',
  //         [
  //             new Ingredient('Buns', 2),
  //             new Ingredient('Meat', 1)
  //         ])
  //   ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {

  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
} 