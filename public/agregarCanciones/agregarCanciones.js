const query = window.location.search.split("=");
const albumId = query[1];
let album;
let newSong = {}

// Valores ingresados por el usuario
function getInputValues() {

    const tituloInput = document.getElementById('titulo');
    const duracionInput= document.getElementById('duracion');
    const linkInput = document.getElementById('link');
  
    const tituloValor = tituloInput.value;
    const duracionValor = duracionInput.value;
    const linkValue = linkInput.value;

    return {
      titulo: tituloValor,
      duracion: duracionValor,
      link: linkValue
    };
  }

const getAlbum = async () =>{
  try{
   const respuesta = await axios.get(`../band/${albumId}`)
   album = respuesta.data;
  }
  catch(error){
  console.log(error)
  }
}
getAlbum()

// agregar cancion

const addSong= async(e)=>{
    e.preventDefault();
    const cancionEnviar=getInputValues();
    try {
        await axios.put(`../song/${albumId}`, cancionEnviar);
        await swal({
            title: 'Cancion Agregada!',
            icon: 'success',
          })
        window.location.href=`../albums/album.html?album=${albumId}`
      } catch (error) {
        swal("Error al agregar la cancion");
      }
    
}
// boton de agregar

const botonAgregar=document.getElementById('agregar_cancion');
botonAgregar.addEventListener('click',(e)=>{
    addSong(e);
    }
)

// boton cancelar

const botonCancelar=document.getElementById('cancelar_cancion');
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