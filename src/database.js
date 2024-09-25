//Conexion con Mongoose

import mongoose from "mongoose";

const mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL,)
    .then(() => {
        console.log('Conectado a la base de datos');
    }).catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
    });
