'use strict';

// Explore Controller:
// Controller handling DOM <-> DB interactions for explore page
app.controller('ExploreController', [
    '$scope', 
    'FBDataFactory', 
    function($scope, FBDataFactory) {
        
        // Retrieve all available content and assign to scope
        FBDataFactory.getAllContent()
        .then((contents) => {
            $scope.contents = contents;
            console.log("contents", $scope.contents);
        });
    }
])