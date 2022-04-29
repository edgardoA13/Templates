const formulario = document.getElementById('form_registro');
const inputs = document.querySelectorAll('#form_registro input');
const indexedDB = window.indexedDB;

/*****************CREACION DE LA BASE DE DATOS INDEXEDDB*************************/

let db;
const conexion = indexedDB.open('fiberTemplate', 1);//se crea la base de datos

//si la base de datos existe, la abre
conexion.onsuccess = () => {
	db = conexion.result;
}

//si la base de datos aun no existe, la crea
conexion.onupgradeneeded = (e) =>{
	db = conexion.result;	
	const objectStore = db.createObjectStore('usuarios', {
		keyPath: 'correoUsuario'
	});
}

//control de errores
conexion.onerror = (error) => {
	console.log('Error', error);
}

//guarda data en la base de datos
const addData = (data) => {
	const transaction = db.transaction(['usuarios'], 'readwrite');
	const coleccion = transaction.objectStore('usuarios');
	const request = coleccion.add(data);
}

//lee la data que esta guardada en la base de datos
/*const readData = () => {
	const transaction = db.transaction(['usuarios'], 'readonly');
	const objectStore = transaction.objectStore('usuarios');
	const request = objectStore.openCursor();

	request.onsuccess = (e) => {
		const cursor = e.target.result;
		cursor.continue();
				
		if(cursor){	
			const email = cursor.value.correoUsuario;
			console.log(email)
		}
	}
}*/


/*****************VALIDACION DEL FORMULARIO*************************/
const expresiones = {
	nombre: /^[a-zA-Z\s]{15,45}$/,
	correo:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$/,
	password: /^[a-zA-Z0-9]{4,12}$/,
}

const validarForm = (e) => {
	switch(e.target.name){
		case "nombre":
			if(expresiones.nombre.test(e.target.value)){
				document.getElementById('nombre').classList.remove('incorrecto');
				document.getElementById('nombre').classList.add('correcto');
				document.getElementById('spanName').classList.remove('spanText');
			} else{
				document.getElementById('nombre').classList.remove('correcto');
				document.getElementById('nombre').classList.add('incorrecto');
				document.getElementById('spanName').classList.add('spanText');
			}
		break;
		case "correo":
			if(expresiones.correo.test(e.target.value)){
				document.getElementById('correo').classList.remove('incorrecto');
				document.getElementById('correo').classList.add('correcto');
				document.getElementById('spanEmail').classList.remove('spanText');
			} else{
				document.getElementById('correo').classList.add('incorrecto');
				document.getElementById('correo').classList.remove('correcto');
				document.getElementById('spanEmail').classList.add('spanText');
			}
		break;
		case "contraseña":
			if(expresiones.password.test(e.target.value)){
				document.getElementById('contraseña').classList.remove('incorrecto');
				document.getElementById('contraseña').classList.add('correcto');
				document.getElementById('spanPass').classList.remove('spanText');
			} else {
				document.getElementById('contraseña').classList.add('incorrecto');
				document.getElementById('contraseña').classList.remove('correcto');
				document.getElementById('spanPass').classList.add('spanText');
			}
		break;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarForm);
	input.addEventListener('blur', validarForm);
});

/*****************GUARDADO DE LOS DATOS*************************/
formulario.addEventListener('submit', (e) => {
	e.preventDefault();
	//const correoG = readData();
	const nombre = $('#nombre').val();
	const correo = $('#correo').val();
	const contraseña = $('#contraseña').val();

	var isChecked = document.getElementById('formCheck').checked;

	if(isChecked){		
			if(nombre && correo && contraseña){				
				const data = {
					nombreUsuario: e.target.nombre.value,
					correoUsuario: e.target.correo.value,
					password: e.target.contraseña.value
				}
				
				addData(data);

				document.getElementById('msg-exito').style.display="block";
				setTimeout(() =>{
						document.getElementById('msg-exito').style.display="none";
						window.location.href = 'login.html'
				}, 3000);

				document.querySelectorAll('#form_registro input').forEach((input) =>{
					input.classList.remove('correcto');
				});
										
				formulario.reset();
				
			} else {
				document.getElementById('msg-error').style.display="block";
				setTimeout(() =>{
					document.getElementById('msg-error').style.display="none";
				}, 3000);
			}
		
		
	} else{
		document.getElementById('terminos').style.display="block";
		setTimeout(() =>{
				document.getElementById('terminos').style.display="none";
		}, 3000);
	}
	
});

/**********************MOSTRAR Y OCULTAR CONTRASEÑA***************************/
var ver = document.getElementById('ver');
	var input = document.getElementById('contraseña');
	ver.addEventListener('click', function(){		
		switch(input.type){
			case "password":
				input.type = "text";
				break;
			case "text":
				input.type = "password";
				break;
		}
	});