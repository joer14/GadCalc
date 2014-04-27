'use strict';



angular.module('gadCalcApp')
  .controller('MainCtrl', function ($scope, $location, $anchorScroll) {
    $scope.color = 'blue';
    $scope.pUnitN = 'kg';
  	$scope.pUnitkg = true;
    $scope.pWeight = '0.0';
    $scope.pWeightalt = '0.0';
    $scope.drugSelection = '';
    $scope.drug = '';
    $scope.drugDose = '';
    $scope.drugInfo = '';
    $scope.drugForm = '';
    $scope.drugMMKG = '';
    $scope.userDrug = '';

    $scope.userDoseRatio = '';
    $scope.drugDoseUser = '';
    $scope.continueLook = false;
    $scope.myvar = '';
    $scope.showCalc = false;
    $scope.userAdjusted = true;
    // $scope.drugIndex = '';
    $scope.userAdjustedC = 'text-danger'
    $scope.fractionSize = 5;

    var lbTokg = 0.453592;
    var kgTolb = 2.20462;
    
    // $scope.expression = "\\frac{5 \mathrm{J}}{4} \div \frac{1}{6}";
    // $scope.formula = "\\left( \\dfrac{\\mathrm{User Adjusted} \\mathrm{ \\frac{mmol}{kg}  } }{\\mathrm{Formulation}\\mathrm{  \\frac{mmol}{mL}  }   } \\right)* \\mathrm{Patient Mass (kg)} = \\mathrm{Dose} \\mathrm{(mL)}";
    // V = (D*W)/C)
    $scope.formulaGeneric = "\\left( \\dfrac{\\mathrm{D} \\mathrm{ \\frac{mmol}{kg}  * \\mathrm{W (kg)} } }{\\mathrm{C}\\mathrm{  \\frac{mmol}{mL}  }   } \\right) = \\mathrm{V} \\mathrm{(mL)}";
    
    $scope.formula = "\\left( \\dfrac{\\mathrm{User Adjusted} \\mathrm{ \\frac{mmol}{kg}  * \\mathrm{Patient Mass (kg)} } }{\\mathrm{Formulation}\\mathrm{  \\frac{mmol}{mL}  }   } \\right) = \\mathrm{Dose} \\mathrm{(mL)}";
    $scope.lifeformula = '';
    $scope.checkValue1 = function() {
        return true;
    }

    $scope.drugs = [
                    ['Ablavar','Gadofosveset trisodium','0.25','0.03','0.12','0.03'],
                    ['Dotarem','Gadoterate meglumine','0.5','0.1','0.2','0.1'], 
                    ['Eovist','Gadoxetate disodium','0.25','0.025','0.1','0.025'],
                    ['Gadavist','Gadobutrol','1.0','0.1','0.1','0.1'], 
                    ['Magnevist','Gadopentetate dimeglumine', '0.5','0.1','0.2','0.1'],
                    ['MultiHance','Gadobenate dimeglumine','0.5','0.1','0.2','0.1'], 
                    ['Omniscan','Gadodiamide','0.5','0.1','0.2','0.1'], 
                    ['Optimark','Gadoversetamide','0.5','0.1','0.2','0.1'],
                    ['ProHance','Gadoteridol','0.5','0.1','0.2','0.1']
                    ];
                    
    // $scope.pWeightalt = function(){

    // $locationProvider.html5Mode(false);

    $scope.$watch('pWeight', function() {
    	calcDose(); 
    });
    // $scope.$watch('')

    $scope.$watch('pUnitN', function() {
    	// console.log($scope.pUnitN);
    	if ($scope.pUnitN == 'kg') {
    		$scope.pUnitkg = true;
    	}else{
    		$scope.pUnitkg = false;
    	}
    	calcDose();
    });

    function calcDose(){

    	// console.log('calcing dose');
        // $scope.drugDose = $scope.user

        //for showing alt weight
        if ($scope.pUnitkg){
            $scope.pWeightalt = $scope.pWeight *kgTolb;
            // $scope.liveformula = "\\left( \\dfrac{"+ $scope.drugDoseUser +" \\mathrm{ \\frac{mmol}{kg}} }{"+ $scope.drugForm +"\\mathrm{\\frac{mmol}{mL}}} \\right)* "+ $scope.pWeight +" \\mathrm{kg} = "+ $scope.dose +"\\mathrm{mL}";
    
        }else {
            $scope.pWeightalt = $scope.pWeight* lbTokg;
            // $scope.liveformula = "\\left( \\dfrac{"+ $scope.drugDoseUser +" \\mathrm{mmol/kg} }{"+ $scope.drugForm +"\\mathrm{mmol/mL}} \\right)* "+ $scope.pWeight +" \\mathrm{lb} * 0.453592 \\mathrm{\\frac{kg}{lb}}= "+ $scope.dose +"\\mathrm{mL}";
    
        };



    	$scope.dose = ($scope.drugDoseUser/$scope.drugForm)*$scope.pWeight;
        if (!$scope.pUnitkg) {
        	$scope.dose = $scope.dose*lbTokg;
        }

        // console.log('drugDose,user:', $scope.drugDoseUser);

        // console.log('drugDose,:', $scope.drugMMKG);

        //for flagging if the user has adjusted the dose
        if($scope.drugMMKG != $scope.drugDoseUser){
            $scope.userAdjusted = true;
        }else $scope.userAdjusted = false;


        //for changing the founding amount if it is greater than 5ml
        if($scope.dose > 5){
            $scope.fractionSize = 0;

        }
        else $scope.fractionSize = 1;
    
        // if ($scope.drugDoseUser !=))
        //for adding formulas depending on using kg or lb
        if ($scope.pUnitkg){
            $scope.liveformula = "\\left( \\dfrac{"+ $scope.drugDoseUser +" \\mathrm{ \\frac{mmol}{kg}} * "+ $scope.pWeight +" \\mathrm{kg} }{"+ $scope.drugForm +"\\mathrm{\\frac{mmol}{mL}}} \\right) = "+ $scope.dose +"\\mathrm{mL}";
    
        }else {
            $scope.liveformula = "\\left( \\dfrac{"+ $scope.drugDoseUser +" \\mathrm{mmol/kg} * "+ $scope.pWeight +" \\mathrm{lb} * 0.453592 \\mathrm{\\frac{kg}{lb}} }{"+ $scope.drugForm +"\\mathrm{mmol/mL}} \\right)= "+ $scope.dose +"\\mathrm{mL}";
    
        };

    };


    $scope.$watch('drugSelection',function(){
    	// console.log('fuck');
    	var drugName = $scope.drugSelection;
    	// console.log
    	// console.log(drugName);
    	var items = $scope.drugs;
    	for (var i=0; i<items.length;i++){
    		// console.log(items[i][0] == drugName);
    		if(items[i][0] == drugName){
    			// console.log(items[i])
    			$scope.drugInfo = items[i];
                $scope.drugIndex = i;
    		};
    	};
    	$scope.drugDose = $scope.drugInfo[4];
        $scope.drugDoseUser = $scope.drugInfo[5];
    	$scope.drugForm = $scope.drugInfo[2];
    	$scope.drugMMKG = $scope.drugInfo[3];
        $scope.userDoseRatio = $scope.drugDoseUser/$scope.drugMMKG;
        // $scope.userDrug = $scope.drugInfo[]
    	calcDose();
    	
    });


    function scrolltoTop(){
        // $scope.continueLook = true;
        // $location.hash('top');
        // $anchorScroll();
        // console.log('scrooll to top')
    }
    $scope.continueL = function(){
    	// console.log($scope.continueLook);
        // console.log('look')
    	$scope.continueLook = true;
    	$scope.myvar = 'fadeIn';
        // console.log($scope.continueLook);
        // scrolltoTop();
    }
    $scope.showCalc = function(){
        // console.log($scope.continueLook);
        // console.log('look')
        $scope.showCalc = true;
        
    }
    

    // kgStyle = {class:'btn btn-default button active'};
    $scope.kgStyle={class:'btn btn-default button active'}

    $scope.$watch('drugs',function(){
        // console.log('drugs', $scope.drugs);
        var drugName = $scope.drugSelection;
        // console.log
        // console.log(drugName);
        var items = $scope.drugs;
        for (var i=0; i<items.length;i++){
            // console.log(items[i][0] == drugName);
            if(items[i][0] == drugName){
                // console.log(items[i])
                $scope.drugInfo = items[i];
                if (items[i][3] != items[i][5]) {
                    $scope.userAdjusted = true;
                }
                else $scope.userAdjusted = false;
            };
        };
        $scope.drugDose = $scope.drugInfo[4];
        $scope.drugDoseUser = $scope.drugInfo[5];
        $scope.drugForm = $scope.drugInfo[2];
        $scope.drugMMKG = $scope.drugInfo[3];
        $scope.userDoseRatio = $scope.drugDoseUser/$scope.drugMMKG;

        calcDose();
    },true);

    
   

  });
