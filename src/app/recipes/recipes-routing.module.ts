import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesDetailComponent } from "./recipes-detail/recipes-detail.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";


const routes: Routes = [
    {
        path: '', component: RecipesComponent, //It's important that you have an empty
        //path because you have to keep in mind that we now changed the route conflict
        //to include the path in the app routing module and it will load the recipes module
        //whenever we visit recipes and therefore into recipes module
        canActivate: [AuthGuard],
        children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipesDetailComponent, resolve: [RecipesResolverService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class RecipesRoutingModule { }