
// Valores ingresados por el usuario
function getInputValues() {

    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const emailInput= document.getElementById('email');
    const contraseñaInput = document.getElementById('contraseña');
    
    const nombreValor = nombreInput.value;
    const apellidoValor=apellidoInput.value;
    const emailValor = emailInput.value;
    const contraseñaValor = contraseñaInput.value;
     
        if (nombreValor.length<3) {

                const muyCorto=document.getElementById('corto')
                muyCorto.textContent="Tu respuesta es muy corta";
                muyCorto.classList.add('errorContraseña');
                swal({
                    title: 'Error!',
                    text: `Nombre muy corto`,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                  })
                return false;
        }else{
                return {
                nombre: nombreValor,
                apellido: apellidoValor,
                email: emailValor,
                contraseña: contraseñaValor
                };}
  }

//   crear usuario

const register = async (e) => {
    e.preventDefault();       
    const objectToSend = getInputValues()
    if(objectToSend==false){
    }else{
    try {
      await axios.post("/user", objectToSend);
      swal({
        title: 'Usuario creado!',
        text: 'El usuario se creo con exito!',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    window.location.href = `../../login/login.html`;
    } catch (error) {
        swal({
            title: 'Error!',
            // text: `${error.respuesta.data}`,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
    }
    }
  }

//   boton agregar usuario

const botonAgregar=document.getElementById('crearUsuario');
botonAgregar.addEventListener('click',(e)=>{
    register(e);
    }
)