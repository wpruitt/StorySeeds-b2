'use strict';

// Profile Controller:
// Controller handling DOM <-> DB interactions for Profile page
app.controller('ProfileController', [
    '$scope',
    'FBAuthFactory',
    'FBDataFactory',
    '$location',
    '$route',
    function($scope, FBAuthFactory, FBDataFactory, $location, $route) {
        
        // Assign Firbase user object to currentUser variable on page load
        /* Broken? */
		let currentUser = firebase.auth().currentUser;
		console.log("currentUser", currentUser);
        // Instantiate profile variable as empty string
        let profile = {};
        // Instantiate userKey variable as empty string
        let userKey = "";

        // On page load => retrieve current logged in user
        FBDataFactory.getUser(currentUser.uid)
        // assigns userData to user variable and profile data to
        // profile variable and scope
        .then((userData) => {
            let user = userData;
            console.log("user", user, currentUser);
            userKey = Object.keys(user.data);
            $scope.profile = user.data[Object.keys(user.data)];
            profile = user.data[Object.keys(user.data)];
        })
        // assigns content of current user to scope
        .then(() => {
            FBDataFactory.getUsersContent(currentUser.uid)
            .then((usersContents) => {
                $scope.usersContents = usersContents;
                console.log("usersContent", usersContents);
            })
            .catch((error) => {
                console.log("error", error);
            });
        })
        .catch((error) => {
            console.log("error", error);
        });
    // assigns profile.image to scope
	$scope.editedImage = {
		image: profile.image
	};
	// assigns profile.displayName to scope
	$scope.editedDisplayName = {
		displayName: profile.displayName
	};
	// assigns profile.email to scope
	$scope.editedEmail = {
		email: profile.email
	};
	// assigns profile.bio to scope
	$scope.editedBio = {
		bio: profile.bio
    }; 
    
    // saves edited profilePicture to Firebase
	$scope.editProfilePicture = function() {
		console.log("image", $scope.editedImage);
		FBDataFactory.editProfile($scope.editedImage, userKey)
		.then((data) => {
			$route.reload();
		})
		.catch((error) => {
			console.log("error", error);
		});
	};

	// saves edited displayName to Firebase
	$scope.editDisplayName = function() {
		console.log("displayName", $scope.editedDisplayName);
		FBDataFactory.editProfile($scope.editedDisplayName, userKey)
		.then((data) => {
			$route.reload();
		})
		.catch((error) => {
			console.log("error", error);
		});
	};

	// saves edited email to Firebase
	$scope.editEmail = function() {
		console.log("displayName", $scope.editedDisplayName);
		FBDataFactory.editProfile($scope.editedEmail, userKey)
		.then((data) => {
			$route.reload();
		})
		.catch((error) => {
			console.log("error", error);
		});
	};

	// saves edited Bio to Firebase
	$scope.editBio = function() {
		console.log("bio", $scope.editedBio);
		FBDataFactory.editProfile($scope.editedBio, userKey)
		.then((data) => {
			$route.reload();
		})
		.catch((error) => {
			console.log("error", error);
		});
	};

	// assigns content so specific id to scope
	$scope.getContent = function(contentId) {
		FBDataFactory.getContent(contentId)
		.then((content) => {
			console.log("content", content);
			$location.url(`content/${content.title}/${content.id}`);
		});
	};
    }
]);