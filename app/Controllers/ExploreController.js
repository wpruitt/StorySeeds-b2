'use strict';

// Explore Controller:
// Controller handling DOM <-> DB interactions for explore page
app.controller('ExploreController', [
    '$scope',
    '$location',
    'FBDataFactory',
    'AuthorDisplayNameService', 
    function($scope, $location, FBDataFactory, AuthorDisplayNameService) {


        console.log('ADNS', AuthorDisplayNameService.getDisplayNames());
        /* Original example for Tab/Filter system taken from:
        [Luis José Sánchez]{@link https://github.com/LuisJoseSanchez}
        https://github.com/LuisJoseSanchez/angularjs-bootstrap-tabs-filter-example
        */
        // Set selected tab to 0
        $scope.tab = 0;

        // 
        $scope.searchText = '';

        $scope.filterText = '';

        $scope.filters = ['', {type: 'branch'}, {type: 'seed'}];

        $scope.select = function(setTab) {
            $scope.tab = setTab;
            $scope.filterText = $scope.filters[setTab];
            console.log("selected");
        };
          
        $scope.isSelected = function(checkTab) {
            return ($scope.tab === checkTab);
        };

        // Retrieve all available content and assign to scope
        FBDataFactory.getAllContent()
        .then((contents) => {
            $scope.contents = contents;
            console.log("contents", $scope.contents);
        });

        // Retrieve Content of specified contentId
        $scope.getContent = function(contentId) {
            FBDataFactory.getContent(contentId)
            .then((content) => {
                console.log("content", content);
                $location.url(`content/${content.title}/${content.id}`);
            });
        };
    }
]);