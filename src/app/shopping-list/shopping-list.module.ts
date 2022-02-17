import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { LoggingService } from "../logging.service";
import { SharedModule } from "../shared/shared.module";
import { ShopingListRoutingModule } from "./shoping-list.routing.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        FormsModule,
        ShopingListRoutingModule,
        SharedModule
    ],
    // providers: [LoggingService] //Lazy loaded, use different instances
    //in appAplication
})
export class ShoppingListModule {}