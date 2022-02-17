import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [

  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { //So this here is the end, an alternative syntax, you could use for loading
    //routes lazily instead of using the string, that's a more modern one
    path: 'recipes', loadChildren:
      () => import('./recipes/recipes.module')
        .then(module => module.RecipesModule)
  },
  //'./recipes/recipes.module#RecipesModule'}, 
  {
    path: 'shopping-list', loadChildren:
      () => import('./shopping-list/shopping-list.module')
        .then(module => module.ShoppingListModule)
  },
  //loadChildren is a special property in a 
  //config which Angular understands as please only load the code content
  //or add module, I'm going to point you at when any one when the user visits
  //this path here
  {
    path: 'auth', loadChildren:
      () => import('./auth/auth.module')
        .then(module => module.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, //forRoot is only used once essentially
    //here in the app routing module
    { preloadingStrategy: PreloadAllModules })], //We can build owr preloading
    //strategies here where we could more refined logic, for example controlling
    //taht only certain routes should be preloaded
  exports: [RouterModule]
})
export class AppRoutingModule { }