// document.addEventListener("DOMContentLoaded", function() {
//     document.querySelector("form").addEventListener('submit', validarFormulario); 
//   });
//  let inputs=document.querySelectorAll("input");

// function validarFormulario(evento) {
//     evento.preventDefault();
//     let validador;
//     for (let i = 0; i < inputs.length; i++) {
   
//         if(inputs[i].value==''){
//             validador=true;
//         }
//         if ('password'==inputs[i].getAttribute("type")) {
//             let clave=inputs[i].value;
//             if(clave.length<6){
//                 const faltaContraseña=document.getElementById("error");
//                 faltaContraseña.textContent="La contraseña debe ser mayor a 6 caracteres";
//                 faltaContraseña.classList.add("errorContraseña")
//                 inputs[i].parentNode.appendChild(faltaContraseña);
//                 return;
//             }
//         }
//     }
//     if (validador) {
//         swal("Hay que revisar!", "Falta algun campo", "error");
//         return
//     }
//     this.submit();
// }
function getInputValues() {

    const emailInput= document.getElementById('email');
    const contraseñaInput = document.getElementById('contraseña');
    
    const emailValor = emailInput.value;
    const contraseñaValor = contraseñaInput.value;
     

    return {
            email: emailValor,
            contraseña: contraseñaValor
            }
  }
const loginUser = async (e) => {
    e.preventDefault()
    const objectToSend=getInputValues()
    try{
     const respuesta = await axios.post(`/login`,objectToSend)
    window.location.href= "../index.html"
    }
    catch(error){
        swal({
            title: 'Error!',
            icon: 'error',
          })
    }
}

const loginButton = document.getElementById('ingresar')
loginButton.addEventListener('click', (e)=> loginUser(e))