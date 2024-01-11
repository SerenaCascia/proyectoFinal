const query = window.location.search.split("=");
const albumId = query[1];



// Valores ingresados por el usuario
function getInputValues() {

    const tituloInput = document.getElementById('titulo');
    const  descripcionInput= document.getElementById('descripcion_del_album');
    const imagenInput = document.getElementById('imagen');
  
    const tituloValor = tituloInput.value;
    const descripcionValor = descripcionInput.value;
    const imagenValor = imagenInput.value;
  

    return {
      titulo: tituloValor,
      descripcion: descripcionValor,
      portada: imagenValor
    };
  }

//   editar el album
const changeAlbum = async(e)=>{
    e.preventDefault()
    const objectToSend = getInputValues()
    try{
       await axios.put(`/band/${albumId}`,objectToSend)
       await swal({
        title: 'Album editado!',
        text: 'El album se modifico con exito!',
        icon: 'success',
        confirmButtonText: 'Ok'
      }) 
        window.location.href = `../index.html`
    }
    catch(error){
        swal({
            title: 'Error!',
            text: `${error.respuesta.data}`,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    }
}

// boton de editar

const botonEditar=document.getElementById('editarAlbum');
botonEditar.addEventListener('click',(e)=>{
    changeAlbum(e);
    }
)

// boton cancelar

const botonCancelar=document.getElementById('cancelarAlbum');
botonCancelar.addEventListener('click',()=> {
    window.location.href=`../albums/album.html?album=${albumId}`}
)

const logout = async () => {
  try {
    await axios.post('../me');

    await swal({
      title: 'Deslogueado',
      icon: 'success',
    })
    window.location.href= "../../login/login.html"
  } catch (error) {
    console.log(error);
  }
};

const botonlogout=document.getElementById('logout')

botonlogout.addEventListener('click',()=> logout())