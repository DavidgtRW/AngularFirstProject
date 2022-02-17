import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesDetailComponent } from "./recipes-detail/recipes-detail.component";
import { RecipesItemComponent } from "./recipes-list/recipes-item/recipes-item.component";
import { RecipesListComponent } from "./recipes-list/recipes-list.component";
import { RecipesComponent } from "./recipes.component";
import { SharedModule } from "../shared/shared.module";

//It's not enough to just point at recipes.routing.module, you really
//just also need to have it here in declarations-

//We manage the loading of our components, there with recipes routing, we do
//define which component should be loaded for which route, there is no reason
//to still export, because we're now only using them internally in the 
//recipes module. We're using them either embedded into other components
//here or by loading them through the recipes routing module,
//both is part of this file. So there is no reason to export the recipe
//components anymore because we're not using these recipe components in
//the app component or any child component of th app component
@NgModule({
    declarations: [
        RecipesComponent,
        RecipesListComponent,
        RecipesDetailComponent,
        RecipesItemComponent,
        RecipeStartComponent,
        RecipeEditComponent
    ],
    imports: [
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule
    ]
})
export class RecipesModule {}