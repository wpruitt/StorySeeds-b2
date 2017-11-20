'use strict';

// Declare app level module which depends on views, and components
const app = angular.module('StorySeedsApp', [
  'ngRoute',
  'ngSanitize',
  'ngTagsInput',
  'StorySeedsApp.version'
]);

let isAuth = () => new Promise((resolve, reject) => {
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      console.log("isAuth");
      resolve();
    }else{
      console.log("!isAuth");
      reject();
    }
  });
});

let notAuth = () => new Promise((resolve, reject) => {
  firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
      console.log("isAuth");
      reject();
    }else{
      console.log("!isAuth");
      resolve();
    }
  });
});

app.config([
  '$locationProvider', 
  '$routeProvider', 
  function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
  .when("/login", {
    templateUrl: 'Views/LoginView.html',
    controller: 'LoginController'
  })
  .when("/register", {
    resolve: {notAuth},
    templateUrl: 'Views/RegisterView.html',
    controller: 'RegisterController'
  })
  .when("/logout", {
    templateUrl: 'Views/LogoutView.html',
    controller: 'LogoutController'
  })
  .when("/upload", {
    resolve: {isAuth},
    templateUrl: 'Views/UploadView.html',
    controller: 'UploadController'
  })
  .when("/myprofile/:userId", {
    resolve: {isAuth},
    templateUrl: 'Views/MyProfileView.html',
    controller: 'MyProfileController'
  })
  .when("/profile/:userId", {
    templateUrl: 'Views/ProfileView.html',
    controller: 'ProfileController'
  })
  .when("/explore", {
    templateUrl: 'Views/ExploreView.html',
    controller: 'ExploreController'
  })
  .when("/content/:contentTitle/:contentId", {
    templateUrl: 'Views/ContentView.html',
    controller: 'ContentViewController'
  })
  .when("/createbranch/:contentId", {
    resolve: {isAuth},
    templateUrl: 'Views/CreateBranchView.html',
    controller: 'CreateBranchController'
  })
  .otherwise({redirectTo: '/explore'});
}]);

app.run((FBCreds) => {
  let creds = FBCreds;
  let authConfig = {
    apiKey: creds.apiKey,
		authDomain: creds.authDomain,
		databaseURL: creds.databaseURL
  };
  firebase.initializeApp(authConfig);
});

