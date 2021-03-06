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
        
        $scope.checkboxModel = {
            Fantasy: false,
            Horror: false,
            Mystery: false,
            ["Science Fiction"]: false,
            Romance: false
        };

        // Tags object
        $scope.tags =[];

        let seedId = "";
        
        FBDataFactory.getContent($routeParams.contentId)
        .then((content) => {
            seedId = content.seedId;       
        });
            
        // Assigns user inputs to scope obj
        $scope.obj = {
            uid: currentUserid,
            type: "branch",
            title: "",
            description: "",
            image: "",
            genre: $scope.checkboxModel,
            tags: $scope.tags,
            NSFW: false,
            seedId: "",
            branchedfrom: $routeParams.contentId,
            content: "",
            created: ""
        };

        // Placeholder for description/content to explain usage
        // Sets placeholders for descriptions and content inputs
        $scope.placeholder = {
            description: `Give a little description of your branch. Talk about any large changes from your seeded content.`,
            content: "Type out story here."
        };

        // Submits obj scope to Firebase DB
        $scope.submit = function() {
            $scope.obj.seedId = seedId;
            $scope.obj.created = new Date();
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