const formulario = document.getElementById('form_login');
const inputs = document.querySelectorAll('#form_login input');
const indexedDB = window.indexedDB;

/*****************CONEXION CON LA BASE DE DATOS INDEXEDDB*************************/
let db;
const conexion = indexedDB.open('fiberTemplate', 1);

//si la base de datos existe, la abre
conexion.onsuccess = () => {
	db = conexion.result;
		
}
//control de errores
conexion.onerror = (error) => {
	
}

//lee los data que esta guardada en la base de datos
const readData = () => {
	const transaction = db.transaction(['usuarios'], 'readonly');
	const objectStore = transaction.objectStore('usuarios');
	const request = objectStore.openCursor();

	request.onsuccess = (e) => {
		const cursor = e.target.result;
			
		if(cursor){
			const email = cursor.value.correoUsuario;
			const pass = cursor.value.password;

			const correo = $('#correoL').val();
			const contra = $('#contraseñaL').val();
			cursor.continue();
			if(correo && contra){
				if(email == correo && pass == contra){
				location.href = '../views/homepage.html';
				sessionStorage.setItem("sesion", JSON.stringify(cursor.value));
				} else{
					document.getElementById('error-login').style.display="block";
			                setTimeout(() => {
			                    	document.getElementById('error-login').style.display="none";
			                }, 3000);

			                document.querySelectorAll('#form_login input').forEach((input)=>{
			                    	input.classList.remove('correcto');
			                });
				}
			} else {
				document.getElementById('login-vacio').style.display="block";
		                setTimeout(() => {
		                    	document.getElementById('login-vacio').style.display="none";
		                }, 3000);
			}
			
		} 
	}
}

/*****************VALIDACION DEL FORMULARIO*************************/
const expresiones = {
	correo:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$/,
	password: /^[a-zA-Z0-9]{4,12}$/,
}

const validarForm = (e) => {
	switch(e.target.name){
		case "correoL":
			if(expresiones.correo.test(e.target.value)){
				document.getElementById('correoL').classList.remove('incorrecto');
				document.getElementById('correoL').classList.add('correcto');
				document.getElementById('spanEmail').classList.remove('spanText');
			} else{
				document.getElementById('correoL').classList.remove('correcto');
				document.getElementById('correoL').classList.add('incorrecto');
				document.getElementById('spanEmail').classList.add('spanText');
			}
		break;
		case "contraseñaL":
			if(expresiones.password.test(e.target.value)){
				document.getElementById('contraseñaL').classList.remove('incorrecto');
				document.getElementById('contraseñaL').classList.add('correcto');
				document.getElementById('spanPass').classList.remove('spanText');
			} else{
				document.getElementById('contraseñaL').classList.remove('correcto');
				document.getElementById('contraseñaL').classList.add('incorrecto');
				document.getElementById('spanPass').classList.add('spanText');
			}
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarForm);
	input.addEventListener('blur', validarForm);
});

/*****************INICIA SESION*************************/
formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        
        readData();
        
});
/**********************MOSTRAR Y OCULTAR CONTRASEÑA***************************/
var eye = document.getElementById('ver');
var input = document.getElementById('contraseñaL');
eye.addEventListener('click', function(){		
	switch(input.type){
		case "password":
			input.type = "text";
			break;
		case "text":
			input.type = "password";
			break;
	}
});

