let nombre= prompt("¿Cuál es tu nombre?");
let edad= parseInt(prompt("¿Cuál es tu edad?"));



const span=document.querySelector("#welcome");
const i=document.querySelector("i");
let todosLosButtons=document.querySelectorAll('button')

// ingreso de nombre
while(nombre.length<2){
    nombre= prompt("Ingrese un nombre valido, debe tener mas de un caracter.");
}

span.textContent = " Hola, "+nombre;
i.setAttribute("class","fa fa-ticket");

// evaluar edad
if(edad<18){
    for (let i = 0; i < todosLosButtons.length; i++) {
        todosLosButtons[i].disabled=true;
        todosLosButtons[i].classList.add("botonDeshabilitado");    
    };    
    
}

// alertas de compra de tickets

let tickets={
    'Movistar Arena': 80,
    'Anfiteatro Humberto de Nito': 10,
    'Antel Arena':20,
    'Quality Arena':10,
    'WiZink Center':10,
    'Estadio Vélez Sarsfield':20,
    'Estadio Delmi':10,
    'SND Arena':10,
}

function disableSoldOutButtons() {
 
 for(let propiedad in tickets ){
    if(tickets[propiedad]==0){
     let comparar= "getTickets('"+propiedad+"')";
        for (let i = 0; i < todosLosButtons.length; i++) {
           if(comparar==todosLosButtons[i].getAttribute('onclick')) {
            todosLosButtons[i].disabled=true;          
            todosLosButtons[i].textContent="SOLD OUT";
            todosLosButtons[i].classList.add("botonDeshabilitado"); 
           }
        }
    }
    
 }
}

function getTickets(lugar) {

    if(tickets[lugar]>0){
        swal("Buena Suerte :)", "Tenes tickets para el concierto en el " + lugar, "success");
        tickets[lugar]=tickets[lugar]-1;
      }   
        
    disableSoldOutButtons();
}



