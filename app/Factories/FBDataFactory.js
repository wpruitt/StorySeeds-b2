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
            })
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

    return {getAllContent,
            getContent,
            getBranches}; 
}]);