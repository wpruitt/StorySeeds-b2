'use strict';

// Controller:
// Controller handling DOM <-> DB interactions for ContentView page
app.controller('ContentViewController', [
    '$scope',
    '$routeParams',
    'FBDataFactory',
    function($scope, $routeParams, FBDataFactory) {

        // Retrieves contentspecified by contentId in url
        FBDataFactory.getContent($routeParams.contentId)
        .then((content) => {
            $scope.content = content;
            console.log("content", $scope.content);
        });

        // Retrieves branches of content

    } 

]);