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

const renderAlbums = (album) => {
    const div = document.getElementsByClassName('containerAlbums')[0]
    const newDiv = document.createElement('div')
    newDiv.classList.add('album')
    
    const img = document.createElement('img')
    let urlPortada = album.portada
    ? album.portada
    : "./imagenes/fotoVacia.jpeg";
    img.setAttribute("src",urlPortada)
    img.setAttribute("alt",album.titulo)
    img.addEventListener("click", () => {
        redirect(album._id);
      });
    
    const i= document.createElement('i')
    i.classList.add('fa-star')
    i.classList.add('fa-regular')
    i.addEventListener("click", function(){

        i.classList.toggle("fa-solid");
       })
    div.appendChild(newDiv)
    newDiv.appendChild(i)
    newDiv.appendChild(img)
    const p = document.createElement('p')
    p.classList.add('textCenter')
    p.textContent = album.año
    newDiv.appendChild(p)
  }

  const getAlbum = async () =>{
    try {
        const respuesta = await axios.get('../band/todos')
        respuesta.data.map((album)=>{
            renderAlbums(album)
        }
        )
        console.log(respuesta);

    } catch (error) {
        console.log(error);
    }
}

getAlbum();


