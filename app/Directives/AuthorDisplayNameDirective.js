'use strict';

// AuthorDisplayNameDirective:
// Manages data binding to upload content
app.directive('authorDisplayName', [
    function() {
        return {
            template: `<h3>Author: {{displayNames[content.uid]}} </h3>`,
            scope: false
        };
}]);