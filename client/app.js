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

		vm.post = function (message) {
			var data = {message: message}
			$http({
				method: 'POST',
				url: vm.apiServiceBaseURI + "post",
				data: data
			}).then(function (response) {
				vm.loadAllMessages();
				vm.errorMessage = null;	
			}, function (error) {
				vm.errorMessage = "Couldn't post messages, try again!"
			});
		}

		vm.loadAllMessages();
	});

})();