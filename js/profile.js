var data = JSON.parse(sessionStorage.getItem("sesion"));

	if(!data){
   		window.location.href = '../index.html';
   	} else{
   		$('#name_user').val(data.nombreUsuario);
		$('#email_user').val(data.correoUsuario);
   	}

   let btnCerrar = document.getElementById('logOut');
   btnCerrar.onclick = cerrarSesion;//agrega funcion onclick al elemento

   function cerrarSesion(e){
   	sessionStorage.removeItem("sesion")
   	window.location.href = '../index.html';
   }