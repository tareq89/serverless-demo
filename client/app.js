(function () {
	'use strict';
	var app = angular.module('app', []);

	app.controller('controller', function ($scope, $http) {
		
		var vm = $scope;
		vm.allMessages = [];
		vm.apiServiceBaseURI = "http://localhost:3000/";
		vm.errorMessage = null;

		vm.loadAllMessages = function () {
			$http({
				method: 'GET',
				url: vm.apiServiceBaseURI + "getall"
			}).then(function (response) {
				vm.allMessages = response.data;
				vm.errorMessage = null;
				console.log(response);
			}, function (error) {
				vm.errorMessage = "Couldn't load data, try refreshing the browser!";
			});
		}

		vm.loadAllMessages();
	});

})();