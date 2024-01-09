document.addEventListener("DOMContentLoaded", function() {
    document.querySelector("form").addEventListener('submit', validarFormulario); 
  });
 let inputs=document.querySelectorAll("input");

function validarFormulario(evento) {
    evento.preventDefault();
    let validador;
    for (let i = 0; i < inputs.length; i++) {
   
        if(inputs[i].value==''){
            validador=true;
        }
        if ('password'==inputs[i].getAttribute("type")) {
            let clave=inputs[i].value;
            if(clave.length<6){
                const faltaContraseña=document.getElementById("error");
                faltaContraseña.textContent="La contraseña debe ser mayor a 6 caracteres";
                faltaContraseña.classList.add("errorContraseña")
                inputs[i].parentNode.appendChild(faltaContraseña);
                return;
            }
        }
    }
    if (validador) {
        swal("Hay que revisar!", "Falta algun campo", "error");
        return
    }
    this.submit();
}