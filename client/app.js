(function () {
	'use strict';
	var app = angular.module('app', []);

	app.controller('controller', function ($scope, $http) {
		
		var vm = $scope;
		vm.allMessages = [];
		vm.apiServiceBaseURI = "http://localhost:3000/";
		vm.kinesisStreamServiceURI = "http://localhost:4567";
		vm.newMessage = null;
		vm.errorMessage = null;
		vm.showUpdateOption = false;		

		vm.getCurrentUserHash = function () {
			var timeStamp = Math.floor(Date.now() / 1000);
			var random = Math.round(Math.random()*1000);
			var hash = timeStamp + random;
			return hash;
		}

		vm.getBASE64encodedPayload = function (data) {
			var payload = JSON.stringify(data);
			var bytes = utf8.encode(payload);
			var bas64Encoded = base64.encode(bytes);
			console.log(bas64Encoded);
			return bas64Encoded;
		}

		vm.headers = {
						"Content-Type":"application/x-amz-json-1.1",
						"Authorization":"AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/iam/aws4_request, SignedHeaders=content-type;host; Signature=5d672d79c15b13162d9279b0855cfba6789a8edb4c82c400e06b5924a6f2b5d7",
						"x-amz-date":"20150830T123600Z",
						"x-amz-target":"Kinesis_20131202.PutRecord"
					}

		vm.hash = vm.getCurrentUserHash();

		vm.loadAllMessages = function () {
			$http({
				method: 'GET',
				url: vm.apiServiceBaseURI + "getall"
			}).then(function (response) {
				vm.allMessages = [];
				angular.forEach(response.data, function (value, index) {
					
					var canEditorDelete = false;										
					if (value.includes(vm.hash)) {
						canEditorDelete = true;						
					}
					var value = value.substr(10);
					var data = {
						value: value, 
						showUpdateOption: false,
						canEditorDelete: canEditorDelete
					};					
					vm.allMessages.push(data);
				});
				console.log(vm.allMessages);
				vm.errorMessage = null;			
			}, function (error) {
				vm.errorMessage = "Couldn't load data, try refreshing the browser!";
			});
		}

		vm.post = function () {
			if (vm.newMessage) {
				var data = {
					message: vm.hash + vm.newMessage,
					method: 'POST'
				};
				data = vm.getBASE64encodedPayload(data);
				var streamPayload = {
				  StreamName: "statup",
				  Data: data,
				  PartitionKey: "partitionKey"
				};
				$http({
					method: 'POST',
					url: vm.kinesisStreamServiceURI,
					data: streamPayload,
					headers: vm.headers
				}).then(function (response) {
					vm.loadAllMessages();
					vm.newMessage = null;
					vm.errorMessage = null;	
				}, function (error) {
					vm.errorMessage = "Couldn't post messages, try again!"
				});	
			}
			
		}

		vm.update = function (index, messageToBeUpdated) {
			var data = {
				index: index,
				message : vm.hash + messageToBeUpdated,
				method: 'PUT'
			};
			data = vm.getBASE64encodedPayload(data);
			var streamPayload = {
			  StreamName: "statup",
			  Data: data,
			  PartitionKey: "partitionKey"
			};

			$http({
				method: 'POST',
				url: vm.kinesisStreamServiceURI + "update",
				data: streamPayload,
				headers: vm.headers
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