'use strict';

// AuthorDisplayNameDirective:
// Manages data binding to upload content
app.directive('authorDisplayName', [
    function() {
        return {
            template: `<h3>Author: {{author}}</h3>`,
            scope: {
                uid: '=value'
            },
            link: function(scope, element, attrs) {
                scope.displayNames = scope.$parent.displayNames;     
                scope.author = scope.displayNames[scope.uid];
            }
        };
}]);