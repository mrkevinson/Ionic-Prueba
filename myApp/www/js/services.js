var chats;
var json;
function buscar()
	{
	Parse.initialize("1xCXPxq3rekSBzr3EFvzB2hcpUud0KyDzAU14ulF", "SzviBY50XswUAkAXq1ARlG0eyjTaRbcVUJjRsnkG");
	var Prueba = Parse.Object.extend("Prueba");
	var query = new Parse.Query(Prueba);
	query.find({
	  success: function(results) {
	    //alert("Successfully retrieved " + results.length + " scores.");
	    // Do something with the returned Parse.Object values
	    
	    	var text = '';
	    for (var i = 0; i < results.length; i++) { 
	    	
	    	var object = results[i];
	    	if(i == results.length-1)
	    	{
	    		text += '{id:"'+object.id+'","name":"'+object.get('Nombre')+'", "lastText":"'+object.get('UltimoMensaje')+'","face":"'+object.get('Imagen')+'" }';	
	    	}
	    	else
	    	{
				text += '{id:"'+object.id+'","name":"'+object.get('Nombre')+'", "lastText":"'+object.get('UltimoMensaje')+'","face":"'+object.get('Imagen')+'" },';
			}
	    }
	    text += '';
	   	json = JSON.stringify(eval("[" + text + "]"));
	   	chats = json;
	   	return chats;
	  },
	  error: function(error) {
	    alert("Error: " + error.code + " " + error.message);
	  }
	});
	};
angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array
	 	
	haceAlgo(paso1);
  // Some fake testing data
  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
	
	
		
  
});
function haceAlgo(callbackPaso1){
		chats= buscar();
	    
	   	{
	    	callbackPaso1(chats);
	    }
	}
function paso1(chats){
	     return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
	}


