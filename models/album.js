const mongoose = require('mongoose');

const album = new mongoose.Schema({
    titulo:{
            type:String,
            required:[true,'Este campo es requerido'],
            trim: true,},
    descripcion:{
            type:String,
            required:[true,'Este campo es requerido'],
            trim: true,
            min: [ 5, 'La descripcion debe contener 5 o más caracteres' ],
            max: [ 500, 'La descripcion puede contener máximo 500 caracteres' ],
        },
    año:{
        type:Number,
        required:[true,'Este campo es requerido'],
        trim: true,
        min:[1,'Debe ser mayor a 0']},
    canciones:[{
        titulo:{
                type:String,
                required:[true,'Este campo es requerido']
                },
        duracion:{
                type:String,
                required:[true,'Este campo es requerido']},
        link: {type: String}
    }],
    portada:{type:String}
})

module.exports= mongoose.model("Album", album);