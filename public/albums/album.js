const query = window.location.search.split("=");
const albumId = query[1];
let cantidadCanciones=1;



function renderAlbum(album){
    const info_del_album = document.getElementsByClassName('infoAlbum')[0]
    const h1 = document.createElement('h1')
    h1.textContent= album.titulo
    const p = document.createElement('p')
    const br= document.createElement('br')
    p.textContent= album.descripcion
    info_del_album.appendChild(h1)
    info_del_album.appendChild(br)
    info_del_album.appendChild(p)
 }

 function renderSong(cancion) {
    const contenedor=document.getElementsByClassName('listaCanciones')[0]
    const div=document.createElement('div')
    div.classList.add('fechas');

    const numero=document.createElement('p')
    numero.textContent=`${cantidadCanciones}-`
    cantidadCanciones++
    const titulo=document.createElement('p')
    titulo.textContent=cancion.titulo
    const duracion=document.createElement('p')
    duracion.textContent=cancion.duracion
    const eliminar=document.createElement('i')
    eliminar.classList.add('fa-solid','fa-trash')
    eliminar.setAttribute("id", "eliminar");
    const escuchar=document.createElement('i')
    escuchar.classList.add('fa-solid','fa-headphones')
    
    escuchar.addEventListener('click', () => window.open(cancion.link,'_blank'))

    // eliminar.addEventListener("click", () => {
    //   deleteSong(albumId,cancion);
    // });

    contenedor.appendChild(div)
    div.appendChild(numero)
    div.appendChild(titulo)
    div.appendChild(duracion)
    div.appendChild(eliminar)
    div.appendChild(escuchar)
    
 }

 const getAlbum = async () =>{
    try{
      const respuesta = await axios.get( `../../band/${albumId}`)
      albumToUse = respuesta.data;
      console.log(albumToUse);
      renderAlbum(albumToUse);
      if(albumToUse.canciones.length>0){
        albumToUse.canciones.map((cancion)=> { 
            renderSong(cancion)})
    }
    const borrar = document.querySelectorAll("#eliminar");
    for (let i = 0; i < borrar.length; i++) {
      borrar[i].addEventListener("click", () => {
        deleteSong(albumId, albumToUse.canciones[i]._id);
      });
    }
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
  getAlbum();

const deleteSong = async (album, cancion) => {
  try {
    await axios.put(`../../song/delete/${album}?idSong=${cancion}`);
    await swal({
      title: 'Cancion eliminada correctamente!',
      icon: 'success',
    })
    let playlist=document.querySelector('.listaCanciones');
    playlist.innerHTML='';
    cantidadCanciones=1;
    const res=await axios.get(`../../band/${album}`);
    albumModificado=res.data;
    albumModificado.canciones.map((cancion)=> { 
          renderSong(cancion)})

    const borrar = document.querySelectorAll("#eliminar");
    for (let i = 0; i < borrar.length; i++) {
      borrar[i].addEventListener("click", () => {
        deleteSong(albumId, albumToUse.canciones[i]._id);
      });
    }
  } catch (error) {
    console.log(error);
    console.log('aca');
  }
};

  // navbar funciones

  // editar album
  const editarAlbum=document.getElementById('editarAlbum')
  editarAlbum.addEventListener('click',()=> window.location.href = `../editarAlbum/editarAlbum.html?album=${albumId}`)

  // agregar canciones

  const agregarCancion=document.getElementById('añadirCanciones')
  agregarCancion.addEventListener('click',()=> window.location.href = `../agregarCanciones/agregarCanciones.html?album=${albumId}`)

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

