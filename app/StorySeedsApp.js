'use strict';

// Declare app level module which depends on views, and components
const app = angular.module('StorySeedsApp', [
  'ngRoute',
  'StorySeedsApp.view1',
  'StorySeedsApp.view2',
  'StorySeedsApp.version'
]);

app.config([
  '$locationProvider', 
  '$routeProvider', 
  function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
  .when("/explore", {
    templateUrl: 'Views/ExploreView.html',
    controller: 'ExploreController'
  })
  .otherwise({redirectTo: '/view1'});
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

