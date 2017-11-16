'use strict';

// Logout Controller:
// Controller handling DOM <-> DB interactions for logout page
app.controller('LogoutController', [
    'FBAuthFactory',
    '$location',
    '$route',
    function(FBAuthFactory, $location, $route) {
        
        // On page load
        // if user is not logged in, redirect to /explore
        if(!FBAuthFactory.isAuthenticated()) {
            $location.url('/explore');
            $route.reload();
        }

        // Log user out and redirect to /explore
        FBAuthFactory.FBLogoutUser()
        .then((data) => {
            $location.url('/explore');
            $route.reload();
        })
        .catch((data) => {
            $location.url('/explore');
            $route.reload();
        });
    }
]);