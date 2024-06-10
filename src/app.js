import express from "express";
const app = express();
const PUERTO = 8080;
import petsRouter from "./routes/pets.routes.js";
import usersRouter from "./routes/users.routes.js";
import multer from "multer"

app.use(express.json());

app.use(express.urlencoded({ extended: true }));



app.use("/api/pets", petsRouter);
app.use("/api/users", usersRouter);

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto: ${PUERTO}`);
})


app.use("/static", express.static("./src/public"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/public/img");
        //Acá le digo donde se van a guardar los archivos. 
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
        //Mantengo el nombre original
    }
})

const upload = multer({ storage });

app.post("/upload", upload.array("imagen"), (req, res) => {
    //Necesito que sea POST porque tengo que cargar un recurso al servidor. 
    res.send("Upload!");
})