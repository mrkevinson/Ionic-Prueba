/*googleanalyticsApp.controller('AwesomeController', function($scope) {
    
});*/

angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
		

})

/**
 * Manejo de la pagina de muestra de los chats
 * @class ChatsCtrl
 * 
 */
.controller('ChatsCtrl', function($scope, Chats) {


	try
	{
		if(typeof analytics !== undefined) {
    	analytics.startTrackerWithId("UA-63689312-1");
	} else {
		console.log("Google Analytics Unavailable");
	}}catch(err){alert("Holi "+err);}

	try{
	if(typeof analytics !== undefined) { analytics.trackView("ChatsCtrl"); alert('Este es el ChatsCtrl');}
 
    $scope.initEvent = function() {
        if(typeof analytics !== undefined) { analytics.trackEvent("Category", "Action", "Label", 25); }
    };
	/*$cordovaGoogleAnalytics.debugMode();
	$cordovaGoogleAnalytics.startTrackerWithId('UA-63689312-1');
  	$cordovaGoogleAnalytics.setUserId('USER_ID');
	$cordovaGoogleAnalytics.trackView('Home Screen');
	$cordovaGoogleAnalytics.addCustomDimension('dimension1', 'Level 1');*/

	}catch(err){alert("No se que fallo :( " +err);}









	/**
	 * Esto se realiza al entrar a la pagina mostrando cada chat que hay
	 * @event load
	 */
	try{
		
		window.analytics.trackView(location.pathname);}
		catch(err){alert(err);}
    Parse.initialize("1xCXPxq3rekSBzr3EFvzB2hcpUud0KyDzAU14ulF", "SzviBY50XswUAkAXq1ARlG0eyjTaRbcVUJjRsnkG"); 
	var query = Chats.all();
	query.find({
	  success: function(results) {
	  	 $scope.$apply(function () {
        	$scope.chats = results;    
        });
	    
	  },
	  error: function(error) {
	  }
	});
  $scope.chats =Chats.all();
  
  /**
   * Llama al metodo para eliminar cuando se lanze el evento
   * @event remove
   * @param chatid {string} Id para identificar el chat a eliminar
   */
  
  $scope.remove = function(chatid) {
    			Chats.remove(chatid);
  			};
})

/**
 * Manejo de la pagina para el detalle del Chat
 * @class ChatsDetailCtrl
 * 
 */

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats ) {
	
	/**
	 * Este evento muestra la informacion del chat
	 * @event load
	 */
	
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

.controller('AccountCtrl', function($scope, Usuarios) {
	var query = Usuarios.get();
// Send the dimensions to Parse along with the 'search' event

	query.get("GXYKilHC3K", {
		 success: function(gameScore) {
		 	$scope.$apply(function()
		 	{
		 		$scope.miusuario = gameScore;
		 		$scope.checked = gameScore.get("Admin");
		 		var Roles = Parse.Object.extend("Roles");
				var queryR = new Parse.Query(Roles);
		 		queryR.get($scope.miusuario.get("rolesId").id, {
				 success: function(gameScore) {
				 	$scope.$apply(function(){
				 		if($scope.miusuario.get("Admin") == true)
				 		{
				 		$scope.rol = gameScore.get("Nombre");				 	
				 	
				 		alert("Listo " + JSON.stringify($scope.rol));
				 		}
				 	});
				 		
				},
					error: function(object, error) {
						alert("No se pudo "+ JSON.stringify(error));
					}
				});
			});
				 	
		 	
		 	alert("Listo " + JSON.stringify($scope.checked));
		},
		error: function(object, error) {
			alert("No se pudo "+ JSON.stringify(error));
		}
	});
	
  $scope.settings = {
    enableFriends: true
  };
})

/**
 * Manejo de la pagina para agregar chats
 * @class ChatsAddCtrl
 * 
 */

.controller('ChatAdd', function($scope, $stateParams, Chats) {
  
  /**
   * Este evento crea la variable para trabajar
   * @event load
   */
  
  $scope.master = {};


/** 
 * Este evento ocurre al momento de enviar la informacion
 * y sirve para guardar la informacion.
 * @event update
 */

      $scope.update = function(user) {
      	$scope.$apply(function(){nuevoObjeto = angular.copy(user);});
        
        $scope.master = angular.copy(user);
      	Chats.add($scope.master);
      };
/** 
 * Este evento ocurre al momento de hacer click en el boton reset
 * y sirve para borrar toda la informacion
 * @event reset
 */
      $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
      };

      $scope.reset();
  
})

/**
 * Manejo de la pagina para realizar las compras
 * @class ChatsBuy
 * 
 */
.controller('ChatBuy', function($scope, $stateParams, $ionicPopup, Chats, Usuarios) {
	
	/**
	 * Este evento obtiene la informacion minima para trabajar
     * @event load
     */
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
  
  /**
   * Este evento se encarga de mostrar/ocultar el formulario desplegable
   * @event toggle
   */
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
  $scope.toggle("si");
  
  /**
   * Sirve para mandar la informacion del formulario
   * @event update
   * @param {Object} compra 
   * Contiene la informacion de los datos, ya sea la informacion de una tarjeta, si se va a usar una tarjeta guardada en stripe o si se actualizara la tarjeta de stripe del cliente.
   */
  
  $scope.update = function(compra) {
  	
  	/**
  	 * Sirve para realizar la compra del articulo (teniendo la informacion de la tarjeta)
	 * @param {Object} usuario
	 * Contiene toda la informacion de la tarjeta en Stripe
  	 */
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
