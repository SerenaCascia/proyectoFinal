const express = require('express');
const app = express();
const routes= require("./routes/index");
const mongoose=require('mongoose');

const url='mongodb+srv://SerenaCascia:39668145@curso-intro.jw2pjxq.mongodb.net/?retryWrites=true&w=majority';


app.use(express.json());

app.use('/', routes);

const connectToMongo= async() =>{

    try{
      await mongoose.connect(url);
      app.listen(5000, () => {
        console.log('servidor escuchando en el puerto 5000 y DB conectado.')
      })
    }catch(error){
      console.log("error");
    }
}

connectToMongo();
// app.listen(5000, () => {
//     console.log('servidor escuchando en el puerto 5000')
//   })