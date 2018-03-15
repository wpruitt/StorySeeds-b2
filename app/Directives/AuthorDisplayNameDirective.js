'use strict';

// AuthorDisplayNameDirective:
// Manages data binding to upload content
app.directive('authorDisplayName', [
    function() {
        return {
            template: `<a ng-click="$event.stopPropagation();" ng-href="#!/profile/{{uid}}"><h3>Author: {{author}}</h3></a>`,
            scope: {
                uid: '=value'
            },
            link: function(scope, element, attrs) {
                scope.displayNames = scope.$parent.displayNames; 
                if(scope.uid){
                    scope.author = scope.displayNames[scope.uid];
                    console.log('scope.uid exist', scope.uid);
                }else{
                    scope.author = "anon";
                    console.log('scope.uid does not exist', scope.uid);
                }  
            }
        };
}]);