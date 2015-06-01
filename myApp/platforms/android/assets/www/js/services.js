angular.module('starter.services', [])


.factory('Usuarios', function()
{
	return{
		add: function(masterC, stripeId){

			alert(JSON.stringify(masterC) + stripeId);
			var Usuario = Parse.Object.extend("Usuario");
			var usuario = new Usuario();
			usuario.set("nombre",masterC.nombre);
			usuario.set("stripeId",stripeId);
			usuario.save(null, {
	  		success: function(nuevoregistro1) {
			    alert('New object created with objectId: ' + nuevoregistro1.id);
			    location.reload();
			  },
			  error: function(object, error) {
			    alert('Failed to create new object, with error code: ' + error.message);
			  }});
		},
		get: function()
		{
			var Usuario = Parse.Object.extend("Usuario");
			var query = new Parse.Query(Usuario);
			return query;
		}
	};
}
)


.factory('Compras',
	function()
	{
		return{
			all:function(custId)
			{
				
			}
		};
	}
)

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
		nuevoregistro.set("Precio",parseInt (prueb.Precio));
		nuevoregistro.save(null, {
  		success: function(nuevoregistro1) {
		    alert('New object created with objectId: ' + nuevoregistro1.id);
		    location.reload();
		  },
		  error: function(object, error) {
		    alert('Failed to create new object, with error code: ' + error.message);
		  }
		});
    }
  };
	
	
		
  
});
