// discos favoritos

// const discosFavoritos=[];

// function agregarFavorito(discos) {
//     const imgs=document.querySelectorAll("img");

//     for (let i = 0; i< imgs.length; i++) {
//       let disco=imgs[i].getAttribute("alt");
//         if(discos.includes(disco)) {
//             const icon = document.createElement("i");
//             icon.classList.add("fa-solid");
//             icon.classList.add("fa-star");
//             imgs[i].parentNode.appendChild(icon);
//             imgs[i].parentElement.classList.add("favorite");
//         }
//     }
// }
// agregarFavorito(discosFavoritos);

const redirect = (id) => { window.location.href = `./albums/album.html?album=${id}`}

// const onLoad = async () => {
//   try {
//     const respuesta = await axios.get("../me");
//     const User = `${respuesta.user.nombre} ${respuesta.user.apellido}`;
//     const userName = document.getElementById("usuario");
//     userName.textContent = User;
//   } catch (error) {
//     window.location.href = "../login/login.html";
//   }
// };
// onLoad();

const renderAlbums = (album) => {
    const div = document.getElementsByClassName('containerAlbums')[0]
    const newDiv = document.createElement('div')
    newDiv.classList.add('album')
    
    const img = document.createElement('img')
    let urlPortada = album.portada
    ? album.portada
    : "./imagenes/fotoVacia.jpg";
    img.setAttribute("src",urlPortada)
    img.setAttribute("alt",album.titulo)
    img.addEventListener("click", () => {
        redirect(album._id);
      });
    
    const fav= document.createElement('i')
    fav.classList.add('fa-star')
    fav.classList.add('fa-regular')
    fav.addEventListener("click", function(){

        fav.classList.toggle("fa-solid");
       })
    const eliminar=document.createElement('i')
    eliminar.classList.add('fa-trash','fa-solid')
    eliminar.setAttribute("id", "eliminar");
    div.appendChild(newDiv)
    newDiv.appendChild(fav)
    newDiv.appendChild(img)
    const p = document.createElement('p')
    p.classList.add('textCenter')
    p.textContent = album.año+' '
    newDiv.appendChild(p)
    p.appendChild(eliminar)
  }

  const getAlbum = async () =>{
    try {
        const respuesta = await axios.get('../band/todos')
        respuesta.data.map((album)=>{
            renderAlbums(album)
        })
        const borrar = document.querySelectorAll("#eliminar");
        for (let i = 0; i < borrar.length; i++) {
          borrar[i].addEventListener("click", () => {
            deleteAlbum(respuesta.data[i]._id);
          });
        }
        console.log(respuesta);

    } catch (error) {
        console.log(error);
    }
}

getAlbum();

const deleteAlbum = async (album) => {
    try {
      await axios.delete(`../band/${album}`);
      await swal({
        title: 'Album eliminado correctamente!',
        icon: 'success',
      })
      const albums = document.querySelectorAll(".album");
      albums.forEach((album) => album.remove());
      const res = await axios.get("../band/todos");
      res.data.map((album) => {
        renderAlbums(album);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await axios.post('../me');

      await swal({
        title: 'Deslogueado',
        icon: 'success',
      })
      window.location.href= "./login/login.html"
    } catch (error) {
      console.log(error);
    }
  };

  const botonlogout=document.getElementById('logout')

  botonlogout.addEventListener('click',()=> logout())



