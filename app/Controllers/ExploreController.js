'use strict';

// Explore Controller:
// Controller handling DOM <-> DB interactions for explore page
app.controller('ExploreController', [
    '$scope',
    '$location',
    'FBDataFactory', 
    function($scope, $location, FBDataFactory) {
        
        // Retrieve all available content and assign to scope
        FBDataFactory.getAllContent()
        .then((contents) => {
            $scope.contents = contents;
        });

        // Retrieve Content of specified contentId
        $scope.getContent = function(contentId) {
            FBDataFactory.getContent(contentId)
            .then((content) => {
                $location.url(`content/${content.title}/${content.id}`);
            });
        };
    }
]);