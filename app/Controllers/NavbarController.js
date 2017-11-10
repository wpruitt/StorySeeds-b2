'use strict';

// Navbar Controller:
// Controller handling DOM <-> DB interactions for Navbar
app.controller('NavbarController', [
    '$scope', 
    'FBAuthFactory', 
    function($scope, FBAuthFactory) {

        // Sets currentUser variable
        $scope.currentUser = null;
        // Creats isLoggedIn & assigns to scope
        $scope.isLoggedIn = null;

        // On auth state change (login/logout)
        firebase.auth().onAuthStateChanged(function(user) {
            console.log("Nav fbAuth firing");
            // if user exists, assigns isLoggedIn to true
            // and user data to currentUser scope
            if(user) {
                console.log("userInfo", user);
                $scope.isLoggedIn = true;
                $scope.currentUser = user;
                console.log("$scope.isLoggedIn", $scope.isLoggedIn);
            }else{
                console.log("no user");
                $scope.isLoggedIn = false;
                $scope. currentUser = null;
                console.log("Error-$scope.isLoggedIn", $scope.isLoggedIn);
            }
        });
    }
]);