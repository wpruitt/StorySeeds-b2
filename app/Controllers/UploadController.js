'use strict';

// UploadCtrl:
// Manages data binding to upload content
app.controller('UploadController', [
    '$scope',
    '$routeParams',
    'FBDataFactory',
    'FBAuthFactory',
    '$location',
    '$timeout',
    function($scope, $routeParams, FBDataFactory, FBAuthFactory, $location, $timeout) {

        // Assigns current logged in user to currentUserid variable +
        let currentUserid = firebase.auth().currentUser.uid;
    
        // Content object +
        $scope.obj = {
            uid: currentUserid,
            type: "",
            title: "",
            description: "",
            image: "",
            genre: ["test1", "test2"],
            tags: ["test1", "test2"],
            NSFW: false,
            seedId: "",
            content: "",
            branchIds: ""
        };
        
        // Placeholder for description/content to explain usage
        $scope.placeholder = {
            description: `Tell us what your seed will grow into. Keep in mind that others may take your idea in a different direction. Explain the theme, identify key characters, initial setting, etc....`,
            content: `Write out your Story here.`
        };
        
        // Submits user object via createContent function
        $scope.submit = function() {
            FBDataFactory.createContent($scope.obj)
            .then((response) => {
                console.log("$scope.obj", $scope.obj);
                console.log("response", response);
                let idObj = {
                    id: response.data.name
                };
                FBDataFactory.addId(response.data.name, idObj)
                .then((response) => {
                    console.log("response", response);
                    $location.url("/explore");
                })
                .catch((error) => {
                    console.log("error", error);
                });
            })
            .catch((error) => {
                console.log("Error:", error);
            });
        };
    }
]);