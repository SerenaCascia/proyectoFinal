const express = require('express');
const router= express.Router();

const bcrypt=require('bcrypt');

const jwt=require('jsonwebtoken');
const user=require('../models/user');
const album=require('../models/album');
const secret='milanesa'

// hashear contraseña
const saltRoundes=10
const hashPassword = (password) => {
    return bcrypt.hashSync(password,saltRoundes);
  };


// inicio
router.get('/',(req,res)=>{
    res.status(200).send("Todo correcto")
})

// crear un usuario

router.post('/user',async(req,res)=>{
    const { nombre, apellido, email, contraseña } = req.body
    const hashed=hashPassword(contraseña)
    const User = { 
        nombre,
        apellido,
        email,
        contraseña: hashed}
    try{
        await user.create(User)
        res.status(201).send('Usuario creado')
    } catch(error){
        res.status(500).send('No se pudo crear el usuario')
    }
})
// login usuario

router.post('/login', async(req,res) => {
    try {
      const email_ingresado=req.body.email
      const contraseña=req.body.contraseña
      const User= await user.findOne({email:email_ingresado})
      const payload= {nombre:User.nombre,apellido:User.apellido,email:User.email, id:User._id}
      const match= await bcrypt.compare(contraseña,User.contraseña)
      if(match){
        const token = jwt.sign(payload, secret, { expiresIn: '24h' })
        res.cookie('token',token)
        res.status(200).send(payload)
      }
     else{
      res.status(401).send({message:'Wrong email or password'})
     }
    } catch (error) {
     res.status(401).send("Error de busqueda") 
    }
})

// verificar usuario
router.post('/me', async(req,res) => {
    try {
        const token = req.cookies.token;
        const payload = jwt.verify(token,secret);
        res.send(payload);
    } catch (error) {
     res.status(401).send("Error")
    }
})
// logout usuario
router.post('/logout', async(req,res) => {
    try {
    const token = req.cookies.token;
    res.clearCookie(token)
    res.status(201).send()
    } catch (error) {
     res.status(401).send("Error de deslogueo")
    }
})
// creaer un album

router.post('/band',async(req,res)=>{
    try{
        await album.create(req.body)
        res.status(201).send('Album creado')
    } catch(error){
        res.status(500).send('No se pudo crear el album')
    }
})
// buscar un usuario por su id

router.get('/user/:id',async(req,res)=>{
    try{
       const us= await user.findById(req.params.id)
        if(us)
        {res.status(201).send({
            usuario:{
                nombre:us.nombre,
                apellido:us.apellido,
                email:us.email
            }
        })
        }else{
        res.status(500).send('No se pudo encontrar el usuario')   
        }

    } catch(error){
        res.status(500).send('Algo salio mal')
    }
})

// editar usuario

router.put('/user/:id',async(req,res)=>{
    try{
       const usuario_para_editar= await user.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(200).send(usuario_para_editar)
    } catch(error){
        res.status(500).send('Algo salio mal')
    }
})

// mostrar los albums

router.get('/band/todos',async(req,res)=>{
    try{
       const albums= await album.find()
        if(albums.length>0){
            res.status(201).send(albums)
        }else{
        res.status(500).send('No hay albums en la base de datos.')   
        }

    } catch(error){
        res.status(500).send('Algo salio mal')
    }
})

// mostrar un album especifico

router.get('/band/:id',async(req,res)=>{
    try{
       const album_especifico= await album.findById(req.params.id)
        if(album_especifico){
            res.status(201).send(album_especifico)
        }else{
        res.status(500).send('No hay un album con ese nombre')   
        }

    } catch(error){
        res.status(500).send('Algo salio mal')
    }
})

// editar album

router.put('/band/:id',async(req,res)=>{
    try{
       const album_para_editar= await album.findByIdAndUpdate(req.params.id, req.body, {new:true})
        res.status(200).send(album_para_editar)
    } catch(error){
        res.status(500).send('Algo salio mal')
    }
})

// agregar canciones
router.put("/song/:idAlbum", async (req, res) => {
    try {
      let album_agregar_cancion = await album.findById(req.params.idAlbum);
      if(album_agregar_cancion){
      album_agregar_cancion.canciones.push(req.body)
      await album.findByIdAndUpdate(req.params.idAlbum, album_agregar_cancion, {
        new: true,
      });
      res.status(200).send(album_agregar_cancion);
        }else{
        res.status(500).send('No hay un album con ese id')   
        }
    } catch (error) {
      res.status(500).send("Algo salio mal");
    }
  });

//   eliminar cancion

router.put("/song/delete/:idAlbum", async (req, res) => {
    let idCancion = req.query.idSong;
    try {
      let album_eliminar_cancion = await album.findById(req.params.idAlbum);
      if(album_eliminar_cancion){
      let album_actualizado = album_eliminar_cancion.canciones.filter(
        (cancion) => cancion._id != idCancion
      );
      album_eliminar_cancion.canciones = album_actualizado;
      await album.findByIdAndUpdate(req.params.idAlbum, album_eliminar_cancion, {
        new: true,
      });
      res.status(200).send({ mensaje: "La cancion se elimino correctamente" });
    }else{
        res.status(500).send('No hay un album con ese id')   
    }
    } catch (error) {
      res.status(500).send(error);
    }
  });

//   eliminar un album
router.delete("/band/:id", async (req, res) => {
    try {
      await album.findByIdAndDelete(req.params.id);
      res.status(200).send("Album eliminado correctamente");
    } catch (error) {
      res.status(500).send("error al eliminar el album");
    }
  });
module.exports =router;