angular.module('myApp')
    .service('getDataService', getDataService);

function getDataService($http){
    var getData = function(modelyear){
        return $http.get("https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForManufacturerAndYear/mer?year="+modelyear+"&format=json");
    }
    return{
        getData: getData
    }
}