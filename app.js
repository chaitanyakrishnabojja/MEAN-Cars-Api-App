angular.module('myApp', []);



var carsCtrl = function($scope, getDataService, getModelsForMakeIdService) {
    
  $scope.hiders = false;
    $scope.displayModels = function($event, make_id) {
        $scope.display2MakeName = "Please wait....loading models....";
        getModelsForMakeIdService.getModelsData(make_id)
                    .success(function(data){
                        $scope.getModels = data.Results;
                        $scope.display2 = "Models Count: ";
                        $scope.display2MakeName = "Make Name: " + $scope.getModels[0].Make_Name;
                        $scope.display2MakeId = "Make ID: " + $scope.getModels[0].Make_ID;
                        console.log("reached getModelsForMakeIdService", data);
                    })
                    .error(function (e) {
                        $scope.display = "Sorry, something's gone wrong ";
                    }); 
    };
   
    var MakeNameList = [];
    $scope.updateSelection = function($event, make_name) {
        $scope.textFilter = "";
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        
        if(make_name == 'checkall'){
            if (action == 'add') {
                MakeNameList = [];
                for(var i = 0; i < $scope.fullNameList.length; i++){    
                        MakeNameList.push($scope.fullNameList[i]);                      
                }
                console.log("MakeNameList add", MakeNameList);
            }else if (action == 'remove'){
                $scope.checkall = false;
                MakeNameList = [];   
                console.log("MakeNameList remove", MakeNameList);
            }
        }else{
            if (action == 'add') {
            var index = MakeNameList.indexOf(make_name);
            if (index == -1) {
                MakeNameList.push(make_name);
            }
            console.log("MakeNameList add", MakeNameList);
            }else if (action == 'remove'){
                var index = MakeNameList.indexOf(make_name);
                if (index > -1) {
                  MakeNameList.splice(index, 1);
                }
                console.log("MakeNameList remove", MakeNameList);
            }
        }
        
        
        
        
        
        $scope.myData = $scope.tempData.filter(function( obj ) {
                
                            for(var i = 0; i < MakeNameList.length; i++){
                                if(obj.MakeName == MakeNameList[i]){
                                    
                                    return obj.MakeName == MakeNameList[i];
                                }
                            }               
                                     
        });
        
//        if(MakeNameList.length == 0 && make_name != 'checkall'){
//            $scope.myData = $scope.tempData;
//            $scope.textFilter = "";
//        }

    };

    $scope.submitSearch = function (isValid){
        
            
       
        $scope.searchHeader = "";

        var currentTime = new Date();
        var year = currentTime.getFullYear();
        if ($scope.modelyear < 1980 || $scope.modelyear > year){
          isValid = false;
        }

        if (isValid){
             $scope.display = "Please wait....loading data....";
            getDataService.getData($scope.modelyear)
               
                .success(function(data){
                    
                    $scope.hiders = true;
                   
                    $scope.tempData = data.Results;
                    $scope.myData = $scope.tempData;
                    $scope.display = "Total Manufacturers Count: ";
                    $scope.fullNameList = [];
                    MakeNameList = [];
                    for(var i = 0; i < $scope.tempData.length; i++){
                        var index = $scope.fullNameList.indexOf($scope.tempData[i].MakeName);
                        if (index == -1) {
                           $scope.fullNameList.push($scope.tempData[i].MakeName);
                            MakeNameList.push($scope.tempData[i].MakeName);
                        }            
                    }
                $scope.getModels = [];
                $scope.display2 = "Models Count: ";
                $scope.display2MakeName = "";
                $scope.display2MakeId = "";
                $scope.checkall = true;
    
                                    
                })
                .error(function (e) {
                    $scope.display = "Sorry, something's gone wrong ";
                });
            
          
            
        }
        else{
          $scope.display = "Invalid year entered. Enter a year from 1980 to the current year";
        }
    };
}

angular.module('myApp')
    .controller('carsCtrl', carsCtrl);
