'use strict';

app.service('AuthorDisplayNameService', [
    'FBDataFactory',
    function(FBDataFactory) {
        this.displayNames = {};
        this.getDisplayNames = function() {
            FBDataFactory.getAllUsers()
            .then((userObjs) => {
                for(var key in userObjs) {
                    this.displayNames[userObjs[key].uid] = userObjs[key].displayName;
                }
            });
        };
    }
]);