// discos favoritos

const discosFavoritos=[];

function agregarFavorito(discos) {
    const imgs=document.querySelectorAll("img");

    for (let i = 0; i< imgs.length; i++) {
      let disco=imgs[i].getAttribute("alt");
        if(discos.includes(disco)) {
            const icon = document.createElement("i");
            icon.classList.add("fa-solid");
            icon.classList.add("fa-star");
            imgs[i].parentNode.appendChild(icon);
            imgs[i].parentElement.classList.add("favorite");
        }
    }
}
agregarFavorito(discosFavoritos);

// favear disco

let iconos=document.querySelectorAll("i");

for (let i = 0; i < iconos.length; i++) {
   iconos[i].addEventListener("click", function(){

    iconos[i].classList.toggle("fa-solid");
   })
    
}
