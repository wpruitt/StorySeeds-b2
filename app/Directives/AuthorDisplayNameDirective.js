'use strict';

// AuthorDisplayNameDirective:
// Displays AuthorDisplayName based on uid

app.directive('authorDisplayNameDirective', [
    'FBDataFactory', 
    function(FBDataFactory) {
        return {
            template: `<h3>Author: {{authorDisplayName}}</h3>`,
            bindings: {value: "="},
            controller: ['FBDataFactory', '$scope', function($scope){
                $scope.authorDisplayName = "";
                FBDataFactory.authorDisplayName($scope.content.uid)
                .then((author) => {
                    console.log(author);
                    $scope.authorDisplayName = author;
                });
            }]
        };
}]);