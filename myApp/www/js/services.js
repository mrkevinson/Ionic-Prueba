angular.module('starter.services', [])

.factory('Chats', function() {
  return {
    all: function() {
    	var Prueba = Parse.Object.extend("Prueba");
		var query = new Parse.Query(Prueba);
      return query;
    },
    remove: function(chatId) {
      var Prueba = Parse.Object.extend("Prueba");
      var destroyMessage = new Prueba;
      destroyMessage.id=chatId;
      alert(destroyMessage.id);
    	destroyMessage.destroy({
		  success: function(myObject) {
		    location.reload();	
		  },
		  error: function(myObject, error) {
		    // The delete failed.
		    // error is a Parse.Error with an error code and message.
		  }
		});

    },
    get: function() {
    	var Prueba = Parse.Object.extend("Prueba");
      	var query = new Parse.Query(Prueba);
      	return query;
      	
      	
    },
    add: function(prueb)
    {
    	var Prueba = Parse.Object.extend("Prueba");
		var nuevoregistro = new Prueba;
		nuevoregistro.set("Nombre",prueb.Nombre);
		nuevoregistro.set("Imagen",prueb.Imagen);
		nuevoregistro.set("UltimoMensaje",prueb.UltimoMensaje);
		nuevoregistro.save(null, {
  		success: function(nuevoregistro1) {
		    alert('New object created with objectId: ' + nuevoregistro1.id);
		  },
		  error: function(object, error) {
		    alert('Failed to create new object, with error code: ' + error.message);
		  }
		});
    }
  };
	
	
		
  
});
