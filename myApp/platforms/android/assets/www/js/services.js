angular.module('starter.services', [])

/**
 * Utilidad para crear y obtener usuarios.
 *
 * @class Usuarios
 * 
 */


.factory('Usuarios', function()
{
	return{
		
			/**
			 	Sirve para guardar toda la informacion de un usuario y guardarla en Parse
				@method add
				@param masterC {Object} Objeto con la informacion que se agregara<br>
				Debe tener los siguientes elementos:<br>
				nombre - Nombre del usuario al que hay que agregar<br>
				@param stripeId {string} Id de el cliente de Stripe para agregar a la base de datos
			*/
		
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
		
			/**
			 	Sirve para regresar una variable de tipo query de usuarios
				@method get
			*/
		get: function()
		{
			var Usuario = Parse.Object.extend("Usuario");
			var query = new Parse.Query(Usuario);
			return query;
		}
	};
}
)

/**
 * Utilidad para regresar todos, eliminiar, obtener y agregar un Chat (Producto)
 *
 * @class Chats
 * 
 */

.factory('Chats', function() {
  return {
  	
  	/**
 	Sirve para regresar una variable de tipo query de los Chats para buscar todos los chats
	@method all
	*/
  	
    all: function() {
    	var Prueba = Parse.Object.extend("Prueba");
		var query = new Parse.Query(Prueba);
      return query;
    },
    
    
    /**
 	Sirve para eliminar un chat en especifico
	@method remove
	@param chatId {string} Id del chat a eliminar
	*/
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
    
    
    /**
 	Sirve para regresar una variable de tipo query de los Chats para buscar solo un chat en especifico
	@method get
	*/
    get: function() {
    	var Prueba = Parse.Object.extend("Prueba");
      	var query = new Parse.Query(Prueba);
      	return query;
      	
      	
    },
    
    /**
 	Sirve para agregar un chat
	@method add
	@param prueb {array} Arreglo de valores a usar para agregar un nuevo Chat<br>
		Debe contener lo siguiente: <br>
			Nombre - Nombre del Chat<br>
			Imagen - URL hacia una imagen<br>
			UltimoMensaje - Caracteres de texto para indicar un mensaje o una descripcion<br>
			Precio - Valor del Chat
	*/
    
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
