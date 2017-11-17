'use strict';

app.factory('UserService', [
    function(){
        let currentUser = {};
        return {
            getCurrentUser: function() {
                return currentUser;
            },

            setCurrentUser: function(cU) {
                currentUser = cU;
            },
        };      
    }
]);