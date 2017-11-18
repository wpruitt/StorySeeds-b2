'use strict';

// CreateBranch Controller:
// Controller handling DOM <-> DB interactions for CreateBranch page
app.controller('CreateBranchController', [
    '$scope',
    '$routeParams',
    'FBDataFactory',
    'FBAuthFactory',
    '$location',
    '$timeout',
    function($scope, $routeParams, FBDataFactory, FBAuthFactory, $location, $timeout) {

        // Assigns current logged in user to currentUser variable
        let currentUserid = firebase.auth().currentUser.uid;
        
        // Assigns user inputs to scope obj
        $scope.obj = {
            uid: currentUserid,
            type: "branch",
            title: "",
            description: "",
            image: "",
            genre: ["test1", "test2"],
            tags: ["test1", "test2"],
            NSFW: false,
            seedId: $routeParams.contentId,
            content: ""
        };

        // Placeholder for description/content to explain usage
        // Sets placeholders for descriptions and content inputs
        $scope.placeholder = {
            description: `Give a little description of your branch. Talk about any large changes from your seeded content.`,
            content: "Type out story here."
        };
        
        // Submits obj scope to Firebase DB
        $scope.submit = function() {
            FBDataFactory.createContent($scope.obj)
            .then((response) => {
                console.log("$scope.obj", $scope.obj);
                console.log("response", response);
                let idObj = {
                    id: response.data.name
                };
                console.log("idObj", idObj);
                // Adds response id to obj 
                FBDataFactory.addId(response.data.name, idObj)
                .then((response) => {
                        console.log("response from addId", response);
                        let branchObj = {
                        [response.data.id] : $routeParams.contentId
                    };
                    console.log('branchObj', branchObj, response.data.name);
                    // Adds branchId to obj then redirects to new content
                    FBDataFactory.addBranchId($routeParams.contentId, branchObj)
                    .then((response) => {
                        $location.url(`content/${$scope.obj.title}/${idObj.id}`);
                    })
                    .catch((error) => {
                        console.log("error", error);
                    });
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