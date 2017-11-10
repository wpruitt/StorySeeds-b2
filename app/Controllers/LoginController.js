'use strict';

// Login Controller:
// Controller handing DOM <-> DB interactions for login page
app.controller('LoginController', [
    '$scope', 
    'FBAuthFactory', 
    '$location', 
    '$route', 
    function($scope, FBAuthFactory, $location, $route) {
        // On page load
        // if user is not logged in redirect to /explore
        if(!FBAuthFactory.isAuthenticated()) {
            $location.url('/explore');
        }

        // Takes user input (email/password) to login to Firebase
        $scope.login = function() {
            FBAuthFactory.FBLoginUser($scope.obj.email, $scope.loginPassword);
        };

        // On authorization state change
        firebase.auth().onAuthStateChanges(user => {
            // if user exists redirect to /explore
            if(user) {
                $location.url('/explore');
                $route.reload();
            }
        });
    }
]);