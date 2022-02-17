# FirstProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Extra info
# CLI Deep Dive & Troubleshooting

If you want to dive deeper into the CLI and learn more about its usage, have a look at its official documentation: https://github.com/angular/angular-cli/wiki

You encountered issues during the installation of the CLI or setup of a new Angular project?

A lot of problems are solved by making sure you're using the latest version of NodeJS, npm and the CLI itself.

Updating NodeJS:

Go to nodejs.org and download the latest version - uninstall (all) installed versions on your machine first.

Updating npm:

Run [sudo] npm install -g npm  (sudo  is only required on Mac/ Linux)

Updating the CLI

[sudo] npm uninstall -g angular-cli @angular/cli 

npm cache verify 

[sudo] npm install -g @angular/cli 

Here are some common issues & solutions:

Creation of a new project takes forever (longer than 3 minutes)
That happens on Windows from time to time => Try running the command line as administrator

You get an EADDR error (Address already in use)
You might already have another ng serve process running - make sure to quit that or use ng serve --port ANOTHERPORT  to serve your project on a new port

My changes are not reflected in the browser (App is not compiling)
Check if the window running ng serve  displays an error. If that's not the case, make sure you're using the latest CLI version and try restarting your CLI

# MUST READ: Potential Project Creation Issues
Important - MUST READ

You will learn how to install the Angular CLI and NodeJS in the next lecture but make sure that you DON'T download NodeJS version 17! Because at the moment, Angular doesn't work with that version.

Instead, download the LTS version of NodeJS. You can download that version via this link (use the "LTS" version): https://nodejs.org/en/download/

In addition, you might encounter dependency errors when creating new Angular projects.

This is a bug in the latest CLI version (13.1.0), published some hours ago:
https://github.com/angular/angular-cli/issues/22333
A fix is on its way:
https://github.com/angular/angular-cli/pull/22334
For now you can run npm i -g @angular/cli@13.0.4 as a workaround, and then create a new project with ng new.

# Bindable Properties and Events
How do you know to which Properties or Events of HTML Elements you may bind? You can basically bind to all Properties and Events - a good idea is to console.log()  the element you're interested in to see which properties and events it offers.

Important: For events, you don't bind to onclick but only to click (=> (click)).

The MDN (Mozilla Developer Network) offers nice lists of all properties and events of the element you're interested in. Googling for YOUR_ELEMENT properties  or YOUR_ELEMENT events  should yield nice results.

# Important: FormsModule is Required for Two-Way-Binding!
Important: For Two-Way-Binding to work, you need to enable the ngModel  directive. This is done by adding the FormsModule  to the imports[]  array in the AppModule.

You then also need to add the import from @angular/forms  in the app.module.ts file:

import { FormsModule } from '@angular/forms'; 

# Creating a New App Correctly
MUST READ

Make sure, you do create that app by also adding the --no-strict flag to the ng new command - otherwise you will run into issues later on (we'll still dive into that "Strict Mode" later in the course of course, no worries)!

We'll also install the Bootstrap CSS Framework and in this course, we use version 3 of the framework. Install it via npm install --save bootstrap@3  => The @3  is important!

Additionally, when using a project created with Angular CLI 6+ (check via ng v ), you'll have an angular.json  file instead of an .angular-cli.json  file. In that file, you still need to add Bootstrap to the styles[]  array as shown in the next video, but the path should be node_modules/bootstrap/dist/css/bootstrap.min.css , NOT ../node_modules/bootstrap/dist/css/bootstrap.min.css . The leading ../  must not be included.

# @ViewChild() in Angular 8+
In Angular 8+, the @ViewChild() syntax which you'll see in the next lecture needs to be changed slightly:

Instead of:

@ViewChild('serverContentInput') serverContentInput: ElementRef;
use

@ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef;
The same change (add { static: true } as a second argument) needs to be applied to ALL usages of @ViewChild() (and also @ContentChild() which you'll learn about later) IF you plan on accessing the selected element inside of ngOnInit().

If you DON'T access the selected element in ngOnInit (but anywhere else in your component), set static: false instead!

If you're using Angular 9+, you only need to add { static: true } (if needed) but not { static: false }.

# @ContentChild() in Angular 8+
For ContentChild, the same adjustments as for ViewChild

# Make sure you have FormsModule added!

# More about the Renderer
You should use the Renderer for any DOM manipulations.

Of course, you can do more than simply change the styling of an element via setStyle(). Learn more about the available Renderer methods here: https://angular.io/api/core/Renderer2

# Closing the Dropdown From Anywhere
If you want that a dropdown can also be closed by a click anywhere outside (which also means that a click on one dropdown closes any other one, btw.), replace the code of dropdown.directive.ts by this one (placing the listener not on the dropdown, but on the document):

import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';
 
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}

# Alternative Non-Collapsable Navigation Bar
The way we added it, the Navbar will collapse on smaller screens. Since we didn't implement a Hamburger menu, that means that there's no way of accessing our links on smaller screens.

You can either add such a menu on your own (see below), or you replace collapse navbar-collapse  with just navbar-default.

Adding a Hamburger Menu:

Alternatively, if you want to make the navigation bar responsive, please replace these lines in header.component.html:

<!--
<div class="navbar-header">
  <a routerLink="/" class="navbar-brand">Recipe Book</a>
</div>
<div class="collapse navbar-collapse">
with these lines:

<div class="navbar-header">
  <button type="button" class="navbar-toggle" (click)="collapsed = !collapsed">
	<span class="icon-bar" *ngFor="let iconBar of [1, 2, 3]"></span>
  </button>
  <a routerLink="/" class="navbar-brand">Recipe Book</a>
</div>
<div class="navbar-collapse" [class.collapse]="collapsed" (window:resize)="collapsed = true">
-->
and add this line to header.component.ts:

collapsed = true;

# Services in Angular 6+
If you're using Angular 6+ (check your package.json  to find out), you can provide application-wide services in a different way.

Instead of adding a service class to the providers[]  array in AppModule , you can set the following config in @Injectable() :

@Injectable({providedIn: 'root'})
export class MyService { ... }
This is exactly the same as:

export class MyService { ... }
and

import { MyService } from './path/to/my.service';
 
@NgModule({
    ...
    providers: [MyService]
})
export class AppModule { ... }
Using this new syntax is completely optional, the traditional syntax (using providers[] ) will still work. The "new syntax" does offer one advantage though: Services can be loaded lazily by Angular (behind the scenes) and redundant code can be removed automatically. This can lead to a better performance and loading speed - though this really only kicks in for bigger services and apps in general.

# Important: Redirection Path Matching
In our example, we didn't encounter any issues when we tried to redirect the user. But that's not always the case when adding redirections.

By default, Angular matches paths by prefix. That means, that the following route will match both /recipes  and just / 

{ path: '', redirectTo: '/somewhere-else' } 

Actually, Angular will give you an error here, because that's a common gotcha: This route will now ALWAYS redirect you! Why?

Since the default matching strategy is "prefix" , Angular checks if the path you entered in the URL does start with the path specified in the route. Of course every path starts with ''  (Important: That's no whitespace, it's simply "nothing").

To fix this behavior, you need to change the matching strategy to "full" :

{ path: '', redirectTo: '/somewhere-else', pathMatch: 'full' } 

Now, you only get redirected, if the full path is ''  (so only if you got NO other content in your path in this example).

# Install RxJS
In order to follow along smoothly with the course examples, make sure you install RxJS v6 by running

npm install --save rxjs@6
In addition, also install the rxjs-compat package:

npm install --save rxjs-compat

# Useful Resources & Links
Useful Resources:

Official Docs: https://rxjs-dev.firebaseapp.com/

RxJS Series: https://academind.com/learn/javascript/understanding-rxjs/

Updating to RxJS 6: https://academind.com/learn/javascript/rxjs-6-what-changed/

# Built-in Validators & Using HTML5 Validation
Which Validators do ship with Angular? 

Check out the Validators class: https://angular.io/api/forms/Validators - these are all built-in validators, though that are the methods which actually get executed (and which you later can add when using the reactive approach).

For the template-driven approach, you need the directives. You can find out their names, by searching for "validator" in the official docs: https://angular.io/api?type=directive - everything marked with "D" is a directive and can be added to your template.

Additionally, you might also want to enable HTML5 validation (by default, Angular disables it). You can do so by adding the ngNativeValidate  to a control in your template.

# Fixing a Bug
In the next lecture, we'll add some code to access the controls of our form array:

*ngFor="let hobbyControl of signupForm.get('hobbies').controls; let i = index"

This code will fail as of the latest Angular version.

You can fix it easily though. Outsource the "get the controls" logic into a method of your component code (the .ts file):
<!--
getControls() {
  return (<FormArray>this.signupForm.get('hobbies')).controls;
}
-->

# In the template, you can then use:

*ngFor="let hobbyControl of getControls(); let i = index"

Alternatively, you can set up a getter and use an alternative type casting syntax:

get controls() {
  return (this.signupForm.get('hobbies') as FormArray).controls;
}
and then in the template:

*ngFor="let hobbyControl of controls; let i = index"

This adjustment is required due to the way TS works and Angular parses your templates (it doesn't understand TS there).
  
# Fixing a Bug
In the next lecture, we'll add some code to access the controls of our form array:

*ngFor="let ingredientCtrl of recipeForm.get('ingredients').controls; let i = index"

This code will fail with the latest Angular version.

You can fix it easily though. Outsource the "get the controls" logic into a getter of your component code (the .ts file):

<!-- 
get controls() { // a getter!
  return (<FormArray>this.recipeForm.get('ingredients')).controls;
}
-->
In the template, you can then use:

*ngFor="let ingredientCtrl of controls; let i = index"

This adjustment is required due to the way TS works and Angular parses your templates (it doesn't understand TS there).
  
# Deleting all Items in a FormArray
As of Angular 8+, there's a new way of clearing all items in a FormArray.

<!-- 
(<FormArray>this.recipeForm.get('ingredients')).clear();
The clear() method automatically loops through all registered FormControls (or FormGroups) in the FormArray and removes them.
-->

It's like manually creating a loop and calling removeAt() for every item.
  
# Useful Resources & Links
Useful Resources:

Official Docs: https://angular.io/guide/http

# Make sure you got Recipes in your backend!
In order to continue with this module and send successful authenticated requests, you need to ensure that you got recipes stored in your backend database.

So in case you deleted those (or never added any), make sure you do add some recipes before you turn on protection as shown in the last lecture!

# Useful Resources & Links
Useful Docs:

Firebase Auth REST API Docs: https://firebase.google.com/docs/reference/rest/auth

More on JWT: https://jwt.io

# Useful Resources & Links
Useful Resources:

Official Docs: https://angular.io/guide/dynamic-component-loader

# Useful Resources & Links
Useful Resources:

Official Docs: https://angular.io/guide/ngmodules

NgModules FAQ: https://angular.io/guide/ngmodule-faq

# Server Routing vs Browser Routing
When deploying your Angular app, it's really important to make sure that your server (like S3) is configured to always serve the index.html file.

Here's why: https://academind.com/learn/angular/angular-q-a/#how-to-fix-broken-routes-after-deployment
