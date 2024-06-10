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

    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);

    }
})

const upload = multer({ storage });

app.post("/upload", upload.array("imagen"), (req, res) => {

    res.send("Upload!");
})