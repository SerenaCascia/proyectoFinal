const express = require('express');
const router= express.Router();
const user=require('../models/user');
const album=require('../models/album');
 
// inicio
router.get('/',(req,res)=>{
    res.status(200).send("Todo correcto")
})

// crear un usuario

router.post('/user',async(req,res)=>{
    try{
        await user.create(req.body)
        res.status(201).send('Usuario creado')
    } catch(error){
        res.status(500).send('No se pudo crear el usuario')
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

// agregar cancione
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
        (cancion) => cancion._id != idSong
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
module.exports =router;