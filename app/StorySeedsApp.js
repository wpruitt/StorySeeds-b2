'use strict';

// Declare app level module which depends on views, and components
const app = angular.module('StorySeedsApp', [
  'ngRoute',
  'ngSanitize',
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
  .when("/logout", {
    templateUrl: 'Views/LogoutView.html',
    controller:'LogoutController'
  })
  .when("/explore", {
    templateUrl: 'Views/ExploreView.html',
    controller: 'ExploreController'
  })
  .when("/content/:contentTitle/:contentId", {
    resolve: {isAuth},
    templateUrl: 'Views/ContentView.html',
    controller: 'ContentViewController'
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

