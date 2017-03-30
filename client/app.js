(function () {
	'use strict';
	var app = angular.module('app', []);

	app.controller('controller', function ($scope, $http) {
		
		var vm = $scope;
		vm.allMessages = [];
		vm.apiServiceBaseURI = "http://localhost:3000/";
		vm.newMessage = null;
		vm.errorMessage = null;
		vm.showUpdateOption = false;

		vm.loadAllMessages = function () {
			$http({
				method: 'GET',
				url: vm.apiServiceBaseURI + "getall"
			}).then(function (response) {
				vm.allMessages = [];
				angular.forEach(response.data, function (value, index) {
					vm.allMessages.push({value: value, showUpdateOption: false})
				});				
				vm.errorMessage = null;			
			}, function (error) {
				vm.errorMessage = "Couldn't load data, try refreshing the browser!";
			});
		}

		vm.post = function () {
			var data = {message: vm.newMessage};
			$http({
				method: 'POST',
				url: vm.apiServiceBaseURI + "post",
				data: data
			}).then(function (response) {
				vm.loadAllMessages();
				vm.newMessage = null;
				vm.errorMessage = null;	
			}, function (error) {
				vm.errorMessage = "Couldn't post messages, try again!"
			});
		}

		vm.update = function (index, messageToBeUpdated) {
			var dataToBeUpdated = {
				index: index,
				newMessage : messageToBeUpdated
			};

			$http({
				method: 'PUT',
				url: vm.apiServiceBaseURI + "update",
				data: dataToBeUpdated
			}).then(function (response) {
				vm.allMessages[index].showUpdateOption = false;
				vm.loadAllMessages();
				vm.errorMessage = null;
			}, function (error) {
				vm.errorMessage = error;
			})
		}

		vm.delete = function (index) {
			var indexToBeDeleted = {
				index: index
			};

			$http({
				method: 'DELETE',
				url: vm.apiServiceBaseURI + "delete",
				data: indexToBeDeleted
			}).then(function (response) {
				vm.loadAllMessages();
				vm.errorMessage = null;
			}, function (error) {
				vm.errorMessage = error;
			});
		}

		vm.loadAllMessages();
	});

})();