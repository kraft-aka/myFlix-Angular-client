# MyFlixAngularClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Description

The main purpose of this project is to build the client-side for an App called myFlix by using Angular framework. This App based on its existing server-side app
(REST API and DB) with supporting documentation.

### User Stories
- As a user, I want to be able to receive information on movies, directors, and genres so that I
  can learn more about movies I’ve watched or am interested in.
- As a user, I want to be able to create a profile so I can save data about my favorite movies.

### Key Features
- Welcome view is displayed, where users are able to to either log in or register an account.
- Authenticated user should now view all movies.
- Upon clicking on a particular movie, users will be taken to a single movie view, where
  additional movie details will be displayed. The single movie view will contain the following
  additional features:
    - A button that when clicked takes a user to the director view, where details about the
      director of that particular movie will be displayed.
    - A button that when clicked takes a user to the genre view, where details about that
      particular genre of the movie will be displayed.
      
 ### Technologies used for this project
 - Angular
 - Angular Material
 - TypeDoc
 
 ## Deployment Process for myFlix Application
 
 
 ### Install Angular
 1. Check weather Angular already installed to the Device
 `ng --version`
 2. If not run following code in command line to install Angular
 `npm install -g @angular/cli`
 
 ### Create a new Angular project
 1. To create new Angular project run following code
 `ng new new-project-name`
 2. Then, navigate to the folder
 `cd new-project-name`
 3. and run project by
 `ng serve --open`
 
 ### Set up app to load data from movie API
 1. Set up Angular HttpClient 1.1. Go to app.module.ts and add
 `import { HttpClientModule } from '@angular/common/http';`
 1.2. Add HttpClientModule to the imports of @NgModule
   2. Create Angular Service for Consuming REST API 
   2.1 Create a new Service inside app folder
   `ng generate service fetch-api-data`
 2.2. Add import statements to fetch-api-data.service.ts file
  ` import { catchError } from 'rxjs/internal/operators';
    import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
    import { Observable, throwError } from 'rxjs';
    import { map } from 'rxjs/operators';`
 3. Implement services logic to make API calls
 - User registration
 - User login
 - Get all movies
 - Get a single movie
 - Get a director
 - Get genre
 - Get user
 - Get favorite movies for a user
 - Add a movie to favorite Movies list
 - Edit user
 - Delete user
 - Delete movie from the favorite Movies
 
 ## Add Angular Material to myFlix
 1. Install Angular Material 
 `ng add @angular/material`
 2. Import models from Angular Material to app.module.ts
 3. Add modules to imports array to serve to other components
 
 ## Create Components for user to use application
 To create a component for the project run 
 `ng generate component new-component-name`
 List and structure of the components:
 - Welcome screen
    - User registration form (sign up)
    - User login form (login)
 - Navbar
 - Movie Card view
 - Dialogs for Movie Card view:
    - Director
    - Genre 
    - Synopsis
 - Profile view
    - Edit profile dialog
    
 ## Add routing to application
 1. Import Angular's built-in router:
 `import { RouterModule, Routes } from '@angular/router';`
 2. Add to app.component.html
 `<router-outlet></router-outlet> `
 3. Create routes in app.module.ts
 `const appRoutes: Routes = [
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'movies', component: MovieCardComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'prefix' },
];`

## Deploy application on github pages
1. Create new github repository for current project
2. Link the new remote repository to the local project folder. To do so, simply run this command from inside your project folder (replace and with your own GitHub username and repository name): git remote add origin https://github.com//.git
3. Add angular-cli-ghpages by running following in CLI
`ng add angular-cli-ghpages`
4. Build your application (i.e., generate static HTML, CSS, and JavaScript files out of your application so that browsers can interpret them without the need to use any extra tools/plugins). To do so, run the following command, replacing with your own repository name:
`ng deploy --base-href=/<repository-name>/`

## Add TypeDoc Documentation
1. Install typedoc globally or locally
`npm install typedoc`
2. Modify an existing tsconfig.json file by adding typedocOptions
`"typedocOptions": {
        "entryPoints": ["src/index.ts"],
        "out": "docs"
    }`
3. Check that code is commented adhering to best practices
4. Run typedoc to generate documentation for project
`npx typedoc --out docs`


 

