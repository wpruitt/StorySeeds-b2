# StorySeeds-b2

#### Creative Writing Linked

Story Seeds provides the framework for creative writers to create and collaborate at will.
Users are able to create original content and have users create content based on their own,
creating anything to expand on the ideas and stories existing. 
Intricate webs can be weaved and expanded on in whatever ways the user can imagine,
or continue on down one line, neverending.

Rebuilding in Angular JS
Original:
https://github.com/wpruitt/StorySeed
Planning on React reader

### Building with:

- AngularJS

   _[Angular Seed](https://github.com/angular/angular-seed)_  
   _[npm](https://www.npmjs.com/)_  
   _[Bower](https://bower.io/)_  
   _[Grunt](https://gruntjs.com/)_  
*please see cooresponding .json files for specific dependencies*
- Bootstrap
- Firebase

### Installation:

If you would like to give the shell application a try 

1. Clone repo
2. Change directory to root folder```cd /StorySeeds-b2```
3. Run ```npm install```
4. Run ```grunt``` *compile sass, etc...*
5. Run app ```npm start``` *suggest from powershell for windows users*

### Database:

To setup access to Firebase 
Create FBCreds.js
```
mkdir Values
cd Values
touch FBCreds.js
```
FBCreds.js(Skeleton):
```
'use strict';

app.constant('FBCreds', {    
	  apiKey: "",
    authDomain: "",
    databaseURL: ""
});
```
Email me if you'd like access to my DB, but I'll be making changes and can't guarantee data persistence.
