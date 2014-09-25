'use strict';

/**
 * @ngdoc function
 * @name angbaseApp.controller:DetailsCtrl
 * @description
 * # DetailsCtrl
 * Controller of the angbaseApp
 */
angular.module('angbaseApp')
  .controller('DetailsCtrl', function ($scope, summary, schA, schE) {

	$scope.sumData = summaryProcess(summary.data);
	$scope.schAData = schA.data;
	console.log(schA.data.length)
	$scope.schEData= schE.data;


  });
