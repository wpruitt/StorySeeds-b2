'use strict';

// RegisterUserCtrl:
// Controller handling DOM <-> DB interactions for registering a user
app.controller('RegisterController', [
    '$scope', 
    'FBAuthFactory', 
    'FBDataFactory', 
    '$location',
    '$route',
    function($scope, FBAuthFactory, FBDataFactory, $location, $route) {

        // Binding of registration object
        $scope.obj = {
            displayName: "",
            email: "",
            image: "",
            bio: ""
        };

        // Sends user registration object to Firebase
        $scope.register = function() {
            FBAuthFactory.FBRegisterUser($scope.obj.email, $scope.registerPassword)
            .then((regData) => {
                $scope.obj.uid = regData.uid;
                FBDataFactory.createUser($scope.obj)
                .then((userData) => {
                    $location.url("/explore");
                });
            })
            .catch((error) => {
            });
        };
    }
]);