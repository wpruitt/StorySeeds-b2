'use strict';

// Controller:
// Controller handling DOM <-> DB interactions for ContentView page
app.controller('ContentViewController', [
    '$scope',
    '$routeParams',
    '$location',
    'FBDataFactory',
    function($scope, $routeParams, $location, FBDataFactory) {

        // Retrieves contentspecified by contentId in url
        FBDataFactory.getContent($routeParams.contentId)
        .then((content) => {
            $scope.content = content;
            console.log("content", $scope.content);
        });

        // Retrieves branches of content
        FBDataFactory.getBranches($routeParams.contentId)
        .then((contentData) => {
            $scope.branches = contentData;
            // console.log("branches", $scope.branches);
        })
        .catch((error) => {
            console.log("error",error);
        });

        // Retrieves content and assigns to scope
        $scope.getBranch = function(contentId) {
            FBDataFactory.getContent(contentId)
            .then((content) => {
                console.log("content", content);
                $location.url(`content/${content.title}/${content.id}`);
            });
        };
        // Creates branch obj to page content
        $scope.createBranch = function(contentId) {
            $location.url(`/createbranch/${contentId}`);
        };
    } 
]);