'use strict';

var mainControllers = angular.module('mainControllers', []);

mainControllers.controller('MainCtrl', ['$scope', 'Entry', 
	function ($scope, Entry) {
    
		$scope.level= 1;

    $scope.startGame = function(){
    	$scope.team = {};
    	$scope.level= 2;
    }

    $scope.registerTeam = function(){
    	Entry.team($scope.team.name);
    }

  }
]);
