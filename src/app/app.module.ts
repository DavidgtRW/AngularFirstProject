import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core.module';
import { LoggingService } from './logging.service';

//IMPORTANT! Every module works on its own in Angular, they don't communicate
//with each other 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule, //We need the HttpClient module because it turns out that
    //this is a module that only sets up some global services, the injectable
    //HTTP service and we need that
    AppRoutingModule, //When we import another module, we import everything
    //that module exports
    //RecipesModule, //Commented because of lazy load
    //ShoppingListModule, //Commented because of lazy load
    SharedModule,
    CoreModule
    //AuthModule //Commented because of lazy load
  ],
  bootstrap: [AppComponent],
  //it's an array of components types, but only of components taht will
  //eventually need to be created without a selector or the route contact being used
  //entryComponents DEPRECATED: With Angular 9 coming in and Ivy as the 
  //new rendering engine, all the components would be considered as 
  //entering components and do not necessarily need to be specified 
  //inside the entryComponents array.
  // entryComponents: [ 
  //   AlertComponent
  // ]
  // providers: [LoggingService]
})
export class AppModule { }
