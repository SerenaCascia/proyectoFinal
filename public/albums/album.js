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
    
    contenedor.appendChild(div)
    div.appendChild(numero)
    div.appendChild(titulo)
    div.appendChild(duracion)
    
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
    }
    catch(error){
      swal({
        title: 'Error!',
        text: `${error.respuesta.data}`,
        icon: 'error',
        //confirmButtonText: 'Ok'
      })
    }
  }
  getAlbum();
