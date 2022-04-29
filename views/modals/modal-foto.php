<?php 

include('../connection/open-connection.php');
$datos = $_SESSION['data'];
$idUsuario = $datos['id_user'];

if(isset($_REQUEST['guardar'])){
  
  if(isset($_FILES['foto']['name'])){
    $tipoArchivo = $_FILES['foto']['type'];
    $nombreArchivo = $_FILES['foto']['name'];
    $tamanoArchivo = $_FILES['foto']['size'];
    $imgSubida = fopen($_FILES['foto']['tmp_name'], 'r');
    $binariosImg = fread($imgSubida, $tamanoArchivo);

    $binariosImg = mysqli_escape_string($connection, $binariosImg);

    /*$query = "INSERT INTO imagenes (nombre, imagen, tipo, id_users) VALUES ('$nombreArchivo', '$binariosImg', 'tipoArchivo','$idUsuario')"; */  
    $query = "INSERT INTO images(nombre, imagen, tipo, id_users)
              VALUES ( '$nombreArchivo', '$binariosImg', '$tipoArchivo', '$idUsuario')
              ON DUPLICATE KEY
              UPDATE nombre = '$nombreArchivo', imagen = '$binariosImg', tipo='$tipoArchivo'"; 

    $resultado = mysqli_query($connection, $query);

    if($resultado){
      echo "Guardo con exito";
    } else{
      echo "Error al guardar";
    }
  }
}
?>

<div class="modal" id="modalFoto" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Avatar</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form method="post" enctype="multipart/form-data">
        	<input type="hidden" name="" value="<?= $datos['id_user'] ?>">
        	<div class="form-group">
        		<input type="file" class="form-control" name="foto" required>
        	</div>
        	<button type="submit" class="btn btn-primary" name="guardar">Guardar</button>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        
      </div>
    </div>
  </div>
</div>