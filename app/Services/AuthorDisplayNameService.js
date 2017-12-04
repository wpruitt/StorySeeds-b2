'use strict';

app.service('AuthorDisplayNameService', [
    'FBDataFactory',
    function(FBDataFactory) {
        this.displayNames = {};
        this.getDisplayNames = function() {
            FBDataFactory.getAllUsers()
            .then((userObjs) => {
                console.log('userObjs', userObjs);
                for(var key in userObjs) {
                    console.log(key);
                    this.displayNames[userObjs[key].uid] = userObjs[key].displayName;
                    console.log('displayNames', this.displayNames);
                }
                console.log('displayNames', this.displayNames);
                return userObjs;
            });
        };
    }
]);