angular.module('myApp')
    .service('getModelsForMakeIdService', getModelsForMakeIdService);

function getModelsForMakeIdService($http){
    var getModelsData = function(makeId){
        return $http.get("https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/" + makeId + "?format=json");
    }
    return{
        getModelsData: getModelsData
    }
}