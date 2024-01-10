const mongoose = require('mongoose');
const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const validator = require('validator');

const user = new mongoose.Schema({
    nombre:{
        type:String,
        require:[true,'Este campo es requerido'],
        lowercase:true,
        trim: true,
        min: [ 2, 'El nombre debe contener 3 o más caracteres' ],
        },
    apellido:{type:String,
            require:[true,'Este campo es requerido'],
            lowercase:true,
            trim: true,
            min: [ 2, 'El nombre debe contener 3 o más caracteres' ],
        },
    email:{
        type:String,
        require:[true,'Este campo es requerido'],
        lowercase:true,
        trim: true,
        validate: {
            validator: function(v) {
                return regex.test(v);
            },
            message: 'Tenes que ingresar un email valido',
        }
        },
    contraseña:{
                type:String,
                require:[true,'Este campo es requerido'],
                trim:true}
})

module.exports= mongoose.model("User", user);