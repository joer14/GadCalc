'use strict';



angular.module('gadCalcApp')
  .controller('MainCtrl', function ($scope) {
    $scope.color = 'blue';
    $scope.pUnitN = 'kg';
  	$scope.pUnitkg = true;
    $scope.pWeight = '0.0';
    $scope.drugSelection = '';
    $scope.drug = '';
    $scope.drugDose = '';
    $scope.drugInfo = '';
    $scope.drugForm = '';
    $scope.drugMMKG = '';
    $scope.continueLook = false;
    $scope.myvar = '';
    var lbTokg = 0.453592;
    

    $scope.$watch('pWeight', function() {
    	calcDose();
    });
    
    $scope.$watch('pUnitN', function() {
    	// console.log($scope.pUnitN);
    	if ($scope.pUnitN == 'kg') {
    		$scope.pUnitkg = true;
    	}else{
    		$scope.pUnitkg = false;
    	}
    	calcDose();
    	// console.log($scope.pUnitkg)
    });

    function calcDose(){
    	// console.log('calcing dose');
    	$scope.dose = $scope.pWeight*$scope.drugDose;
        if (!$scope.pUnitkg) {
        	$scope.dose = $scope.dose*lbTokg;
        }
    };
    $scope.$watch('drugSelection',function(){
    	// console.log('fuck');
    	var drugName = $scope.drugSelection;
    	// console.log
    	// console.log(drugName);
    	var items = $scope.items;
    	for (var i=0; i<items.length;i++){
    		// console.log(items[i][0] == drugName);
    		if(items[i][0] == drugName){
    			// console.log(items[i])
    			$scope.drugInfo = items[i];
    		};
    	};
    	$scope.drugDose = $scope.drugInfo[4];
    	$scope.drugForm = $scope.drugInfo[2];
    	$scope.drugMMKG = $scope.drugInfo[3];
    	calcDose();
    	
    });
    $scope.continueL = function(){
    	console.log('look')
    	$scope.continueLook = true;
    	$scope.myvar = 'fadeIn';
    }
    $scope.items = [
    				['Ablavar','Gadofosveset trisodium','0.25','0.03','0.12'],
    				['Dotarem','Gadoterate Meglumine','0.5','0.1','0.2'], 
					['Eovist','Gadoxetate disodium','0.25','0.025','0.1'],
					['Gadavist','Gadobutrol','1.0','0.1','0.1'], 
    				['Magnevist','Gadopentetate dimeglumine', '0.5','0.1','0.2'],
    				['MultiHance','Gadobenate dimeglumine','0.5','0.1','0.2'], 
    				['Omniscan','Gadodiamide','0.5','0.1','0.2'], 
					['Optimark','Gadoversetamide','0.5','0.1','0.2'],
					['ProHance','Gadoteridol','0.5','0.1','0.2']
					];
					

    // kgStyle = {class:'btn btn-default button active'};
    $scope.kgStyle={class:'btn btn-default button active'}
    
   

  });
