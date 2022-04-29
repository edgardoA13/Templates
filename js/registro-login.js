const formularioR = document.getElementById('form_registro');
const indexedDB = window.indexedDB;

let db;
const conexion = indexedDB.open('fiberTemplate', 1);

conexion.onsuccess = () => {
	db = conexion.result;
	console.log('Database abierta', db);
}

conexion.onupgradeneeded = (e) =>{
	db = conexion.result;
	console.log('Base de datos creada', db);
	const objectStore = db.createObjectStore('usuarios', {
		keyPath: 'correoUsuario'
	});
}

conexion.onerror = (error) => {
	console.log('Error', error);
}

const addData = (data) => {
	const transaction = db.transaction(['usuarios'], 'readwrite');
	const coleccion = transaction.objectStore('usuarios');
	const request = coleccion.add(data);
}

formularioR.addEventListener('submit', (e) => {
	e.preventDefault();

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
			console.log(data);
			addData(data);

			document.getElementById('msg-exito').style.display="block";
							setTimeout(() =>{
								document.getElementById('msg-exito').style.display="none";
							}, 3000);

							document.querySelectorAll('#form_registro input').forEach((input) =>{
								input.classList.remove('correcto');
							});
							
			formularioR.reset();
			
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