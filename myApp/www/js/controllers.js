angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
	var query = Chats.all();
	query.find({
	  success: function(results) {
	  	 $scope.$apply(function () {
        	$scope.chats = results;    
        });
	    
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
  $scope.chats =Chats.all();
  //alert($scope.chats);
  $scope.remove = function(chatid) {
    			Chats.remove(chatid);
  			};
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
	var query = Chats.get();
	query.get($stateParams.chatId,{
		success : function(chat)
		{
			$scope.$apply(function () {
            	$scope.chat = chat;
        	});
			
		},
		error : function (object, error) {
		  
		}
	});
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
  
  
})
.controller('ChatAdd', function($scope, $stateParams, Chats) {
  
  $scope.master = {};

      $scope.update = function(user) {
      	$scope.$apply(function(){nuevoObjeto = angular.copy(user);});
        
        $scope.master = angular.copy(user);
      	Chats.add($scope.master);
      };

      $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
      };

      $scope.reset();
  
});
