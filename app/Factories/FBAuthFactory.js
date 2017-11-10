'use strict';

// FBAuthFactory:
// Factory page to interact with Firebase User 
// Login/Logout/Authentication and other user fuctions
app.factory('FBAuthFactory', [
    '$location',
    function($location) {

        // Variable to store current logged in user
        let currentUser = null;

        // Uses givenemail/password combination to registe a new user via Firebase
        let FBRegisterUser = function(email, password) {
            return firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error:", errorCode, errorMessage);
            });
        };

        // Uses given email/password combination to sign user in via Firebase
        let FBLoginUser = function(email, password) {
            return firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                if(errorCode === "auth/wrong-password") {
                    alert("Wrong password.");
                }else{
                    alert(errorMessage);
                }
                console.log("error:", error);
            });
        };

        // Uses given email/passwordcombinationto sign user out via Firebase
        let FBLogoutUser = function() {
            return firebase.auth().signOut()
            .then(function() {
                $location.url("/explore");
            })
            .catch(function(error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error:", errorCode, errorMessage);
            });
        };

        // Verifies user is authenticated
        // returns current user logged in
        let isAuthenticated = function (){
            return new Promise ((resolve,reject) => {
                firebase.auth().onAuthStateChanged(function(user) {
                    if(user) {
                        currentUser = user.uid;
                        console.log("user", user);
                        resolve(user);
                    }else{
                        resolve();
                    }
                });
            });

        };

        // Assigns current user information to currentUser variable 
        /* Search in other projects */
        let getUser = function(){
            return currentUser;
        };  
        
        return {FBRegisterUser,
                FBLoginUser,
                FBLogoutUser,
                isAuthenticated,
                getUser};
    }
]);