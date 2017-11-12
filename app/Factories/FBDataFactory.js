'use strict';

// FBDataFactory:
// Factory page to interact with Firebase data objects
app.factory('FBDataFactory', [
    '$q',
    '$http',
    'FBCreds',
    function($q, $http, FBCreds) {

        // Returns all content
        const getAllContent = () => {
            return $q((resolve, reject) => {
                $http.get(`${FBCreds.databaseURL}/content.json`)
                .then((content) => {
                    let allContent = Object.values(content.data);
                    console.log("allContent", allContent, content.data);
                    resolve(allContent);
                })
                .catch((error) => {
                    reject(error);
                });
            });
        };

        // Returns specific content based on Id
        const getContent = (id) => {
            return $q((resolve, reject) => {
                $http.get(`${FBCreds.databaseURL}/content/${id}.json`)
                .then((content) => {
                    console.log("content", content);
                    resolve(content.data);
                })
                .catch((error) => {
                    reject(error);
                });
            });
        };

        // Returns all immediate branched content of specified seedId
        const getBranches = (seedId) => {
            return $q((resolve, reject) => {
                $http.get(`${FBCreds.databaseURL}/content.json?orderBy="seedId"&equalTo="${seedId}"`)
                .then((content) => {
                    console.log("content", content);
                    resolve(Object.values(content.data));
                })
                .catch((error) => {
                    reject(error);
                });
            });
        };

        // Returns all content of specified user by userId
        const getUsersContent = (userId) =>{
            return $q((resolve, reject) => {
                console.log(`${FBCreds.databaseURL}/content.json?orderBy="uid"&equalTo="${userId}"`);
                $http.get(`${FBCreds.databaseURL}/content.json?orderBy="uid"&equalTo="${userId}"`)
                .then ((content) => {
                    let usersContent = Object.values(content.data);
                    resolve(usersContent);
                })
                .catch((error) => {
                    reject(error);
                });
            });
        };

        // Creates user obj 
        const createUser = (userObj) => {
            return $q((resolve, reject) => {
                let object = JSON.stringify(userObj);
                console.log(`${FBCreds.databaseURL}/users.json`);
                $http.post(`${FBCreds.databaseURL}/users.json`, object)
                .then((userId) => {
                    resolve(userId);
                })
                .catch((error) => {
                    reject(error);
                });
            });
        };

        // Gets user information object based on userId
        const getUser = (userId) => {
            return $q((resolve, reject) => {
                console.log(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`);
                $http.get(`${FBCreds.databaseURL}/users.json?orderBy="uid"&equalTo="${userId}"`)
                .then((userObj) => {
                    resolve(userObj);
                })
                .catch((error) => {
                    reject(error);
                });
            });
        };

        // Edits user object
        // Refactor: should be able to get patch to work properly
        const editProfile = (editedObj, userId) => {
            return $q((resolve, reject) =>{
                let newObj = JSON.stringify(editedObj);
                console.log("userId", userId);
                console.log("patch position", `${FBCreds.databaseURL}/users/${userId}.json`, newObj);
                $http.patch(`${FBCreds.databaseURL}/users/${userId}.json`, newObj)
                .then((profileObj) => {
                    console.log("profileObj", profileObj);
                    resolve(profileObj);
                })
                .catch((error) => {
                    reject(error);
                });
            });
        };


    return {getAllContent,
            getContent,
            getBranches,
            getUsersContent,
            createUser,
            getUser,
            editProfile}; 
}]);