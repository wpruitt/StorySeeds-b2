'use strict';

// Declare app level module which depends on views, and components
const app = angular.module('StorySeedsApp', [
  'ngRoute',
  'ngSanitize',
  'StorySeedsApp.version'
]);

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

