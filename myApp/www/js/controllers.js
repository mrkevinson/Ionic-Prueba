angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats =Chats.all();
  var a =setInterval(function () 
  {
		if($scope.chats != undefined)
		{
  			//alert("Tengo " +$scope.chats);
  			alert("Convertido "+JSON.stringify($scope.chats));
  			
  			window.clearTimeout(a);
  		}
  		else
  		{
  			try {
			    $scope.chats =JSON.parse(Chats.all());
			}
			catch(err) {
			    //	document.getElementById("demo").innerHTML = err.message;
			}
  			
  		}
  }, 1);
  
  $scope.remove = function(chat) {
    			Chats.remove(chat);
  			};
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
