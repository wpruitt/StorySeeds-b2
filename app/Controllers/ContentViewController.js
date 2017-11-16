'use strict';

// Controller:
// Controller handling DOM <-> DB interactions for ContentView page
app.controller('ContentViewController', [
    '$scope',
    'FBAuthFactory',
    '$routeParams',
    '$location',
    'FBDataFactory',
    '$route',
    function($scope, FBAuthFactory, $routeParams, $location, FBDataFactory, $route) {

        // Assigns current logged in user to currentUser variable
        let currentUserid = firebase.auth().currentUser;
        console.log('currentUserid', currentUserid);
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

        // Returns true/false if obj has branched content
        let objHasBranches = (obj) => {
            for(var key in obj){
                if(obj.hasOwnProperty(key))
                    return true;
            }
            return false;
        };

        // Assigns true/false based on equality of currentUser and content owner
        let showDelBtn = function(contentuid) {
            console.log("current/content", currentUserid, contentuid);
            if(currentUserid === contentuid){
                return true;
            }else{
                return false;
            }
        };

        console.log("showDelBtn", $scope.showDelBtn);

        // Deletes content/makes content anon
        $scope.deleteContent = function(contentId) {
            // if object has branched content
            // make content anonymous
            if(objHasBranches($scope.branches)) {
                console.log("goanon", true, $scope.branches);
                FBDataFactory.makeContentAnon(contentId)
                .then((response) => {
                    $('.modal-backdrop').remove();
                    console.log("response", response);
                    $route.reload();
                })
                .catch((error) => {
                    console.log("error", error);
                });
            // else delete the object
            }else{
                console.log("candel", false);
                FBDataFactory.deleteContent(contentId)
                .then((response) => {
                    $('.modal-backdrop').remove();
                    console.log("response", response);
                    console.log("scope.content.uid", $scope.content.uid);
                    if ($scope.content.seedId) {
                        $location.url(`/content/${$scope.content.seedId}`);
                        $route.reload();
                    }else{
                        $location.url('/explore');
                        $route.reload();
                    }
                })
                .catch((error) => {
                    console.log("error", error);
                });
            }
        };

        // Removes creator identifier from object
        $scope.makeAnon = function(contentId){
            FBDataFactory.makeContentAnon(contentId)
            .then((response) => {
                console.log("response", response);
                $route.reload();
            })
            .catch((error) => {
                console.log("error", error);
            });
        };
    } 
]);