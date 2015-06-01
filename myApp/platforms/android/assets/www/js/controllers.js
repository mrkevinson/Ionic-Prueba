angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
	
	//stripe.customers.removeCard("cus_6JRzwtSg6udKHN","card_1676ZELMkJEjnhkRrJoF0BI6",
    //function (response) {alert("Card Deleted:\n\n" + JSON.stringify(response));},
    //function(response) {alert(JSON.stringify(response));}  // error handler
	//);
        	Parse.initialize("1xCXPxq3rekSBzr3EFvzB2hcpUud0KyDzAU14ulF", "SzviBY50XswUAkAXq1ARlG0eyjTaRbcVUJjRsnkG"); 
	var query = Chats.all();
	query.find({
	  success: function(results) {
	  	 $scope.$apply(function () {
        	$scope.chats = results;    
        });
	    
	  },
	  error: function(error) {
	    //alert("Error: " + error.code + " " + error.message);
	  }
	});
  $scope.chats =Chats.all();
  //alert($scope.chats);
  $scope.remove = function(chatid) {
    			Chats.remove(chatid);
  			};
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats ) {
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
  
})

.controller('ChatBuy', function($scope, $stateParams, $ionicPopup, Chats, Usuarios) {
	
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
  var query = Usuarios.get();
  query.get("GXYKilHC3K", {
	success: function(usuario) {
		$scope.$apply(function () {
	        $scope.usuario= usuario;
	        if($scope.usuario.get('stripeCardId')== "" | $scope.usuario.get('stripeCardId') == null | $scope.usuario.get('stripeCardId') == undefined)
			{
				$scope.nohaytarjeta ="true";
				$scope.toggle('notarjeta');
				$scope.toggle("si");
			}
			else
			{
				$scope.nohaytarjeta = "false";
			}
			try{
	        stripe.customers.retrieveCard(
			  usuario.get('stripeId'),
			  usuario.get('stripeCardId'),
			  function(result){
			     $scope.$apply(function () {
			     $scope.tarjetas = result;
			     alert(JSON.stringify($scope.tarjetas));
			     });
			  });
			  }catch(err){$scope.tarjetas == null;}
		});
	},
	error: function(object, error) {
		alert(error);
	}
  });
	
	
  $scope.masterC = {};
  var prueba = "no";
  $scope.toggle = function(text) {
  	
  	if(text == "notarjeta")
    {
    	$scope.tarjeta = !$scope.tarjeta;
    }
    else
    {
	  	if(text != prueba)
	  	{
	  		prueba = text;
	        $scope.myVar = !$scope.myVar;
	    }
    }
 };
  /**
   * 
   */
  $scope.toggle("si");
  $scope.update = function(compra) {
        function realizaCargo(usuario){
        	stripe.charges.create({
       				customer: usuario.get('stripeId'),
				    amount : $scope.chat.get("Precio")*100,
				    currency : 'usd',
				    source : usuario.get('stripeCardId'),
				    description : "Compra de "+$scope.chat.get("Nombre")
				  },
				  function(result){
				     alert(JSON.stringify(result));
				  });
        }
        $scope.masterC = angular.copy(compra);
        try
        {
        if($scope.masterC.radio != "nueva")
       	{
       		realizaCargo($scope.usuario);
       	}
       	else{
	      	if($scope.masterC.guardar == true)
	      	{
	      		
		      		if($scope.nohaytarjeta == "false")
		      		{
		      			
		      			stripe.customers.removeCard($scope.usuario.get('stripeId'),$scope.usuario.get('stripeCardId'),
					    function (response) {var query = Usuarios.get();
								query.get($scope.usuario.id, {
								  success: function(gameScore) {
								  	alert(JSON.stringify(gameScore));
								  	
								  		gameScore.set("stripeCardId", "");
						    		 gameScore.save(null, {
								  success: function(gameScore1) {
								  	//alert("Informacion actualizada :D");
								  	//realizaCargo(gameScore1);
								  	stripe.customers.createCard($scope.usuario.get('stripeId'),{
									    card : {
									       number : $scope.masterC.numero,
									       exp_month : $scope.masterC.mes,
									       exp_year : $scope.masterC.anio,
									       cvc : $scope.masterC.cvc
									    }
										  },
										  function(result){
										  		alert(JSON.stringify(result));
										  		try{
										  		var query = Usuarios.get();
												query.get($scope.usuario.id, {
												  success: function(gameScore) {
												  	alert(JSON.stringify(gameScore));
												  	
												  		gameScore.set("stripeCardId", result.id);
										    		 gameScore.save(null, {
												  success: function(gameScore1) {
												  	alert("Informacion actualizada :D");
												  	realizaCargo(gameScore1);
												  }
										     });
												  },
												  error: function(object, error) {
												  	alert("No se pudo "+ error);
												  }
												});
												}catch(err){alert(err);}
										  }
									);
								  }
						     });
								  },
								  error: function(object, error) {
								  	alert("No se pudo "+ error);
								  }
								});},
					    function(response) {alert(JSON.stringify(response));}  // error handler
						);
		      		}
		      		else
		      		{
			      		stripe.customers.createCard($scope.usuario.get('stripeId'),{
						    card : {
						       number : $scope.masterC.numero,
						       exp_month : $scope.masterC.mes,
						       exp_year : $scope.masterC.anio,
						       cvc : $scope.masterC.cvc
						    }
						  },
						  function(result){
						  		alert(JSON.stringify(result));
						  		try{
						  		var query = Usuarios.get();
								query.get($scope.usuario.id, {
								  success: function(gameScore) {
								  	alert(JSON.stringify(gameScore));
								  	
								  		gameScore.set("stripeCardId", result.id);
						    		 gameScore.save(null, {
								  success: function(gameScore1) {
								  	alert("Informacion actualizada :D");
								  	realizaCargo(gameScore1);
								  }
						     });
								  },
								  error: function(object, error) {
								  	alert("No se pudo "+ error);
								  }
								});
								}catch(err){alert(err);}
						  });
				  	}
	      	}
	      	else{
	      		stripe.charges.create({
				    amount : $scope.chat.get("Precio")*100,
				    currency : 'usd',
				    card : {
				      number : $scope.masterC.numero,
				      exp_month : $scope.masterC.mes,
				      exp_year : $scope.masterC.anio,
				      cvc : $scope.masterC.cvc,
				      name : $scope.usuario.get('nombre')
				    },
				    description : "Compra de "+$scope.chat.get("Nombre")
				  },
				  function(result){
				     alert(JSON.stringify(result));
				  });
	      	}
      	}
      }catch(err){alert(err);}
      };
  

      
});
