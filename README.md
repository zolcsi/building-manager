# Building-Manager

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

#Design decisions:

- "buildings" module was established to keep the app modular. Made lazy to support 
  future optimizations. At the moment it is loaded anyway, as it is the only feature 
  module and navigated to it immediately after bootstrap  

- "shared" module contains shared, reusable components

- "core" module contains common models, services, etc

- BuildingResolver relieves components of loading the building, reusable in 
  arbitrary components

- nickname-editor component is reusable, with clear input and output properties

- building-list component is reusable, with clear input and output properties. 
  It is highly probable that the list of the building must be shown somewhere 
  else in the future.

#Thoughts:
 - Should the Nicknames get their own Entity in the Building instead of sting[]?
   No. There is no indication that nickname would become more than a string.  
