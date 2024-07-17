//Conexion con Mongoose

import mongoose from "mongoose";
mongoose.connect("mongodb+srv://valentinoburioni:vburioni1234@apivb.vym0xct.mongodb.net/")
    .then(() => console.log("Connect to data base"))
    .catch((error) =>
        res.status(500).send("Error interno :/", error))
