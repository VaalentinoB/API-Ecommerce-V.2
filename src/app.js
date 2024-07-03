import express from 'express';
import cartsRouter from './routes/carts.routes.js';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import productsRouter from './routes/products.routes.js';
import displayRoutes from 'express-routemap';
import viewsRouter from "./routes/views.routes.js"
import mongoose from 'mongoose';
const app = express();
const puerto = 8080;

mongoose.connect("mongodb+srv://valentinoburioni:vburioni1234@apivb.vym0xct.mongodb.net/")
    .then(() => console.log("Connect to data base"))
    .catch((error) =>
        res.status(500).send("Error interno", error))


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./src/public"));
app.use("/", viewsRouter)


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");




app.use('/api/products', productsRouter);
app.use('/api/cart', cartsRouter);






const http = app.listen(puerto, () => {
    displayRoutes(app)
    console.log(`Servidor activo en el puerto ${puerto}`);
});


import ProductManager from './controllers/productmanager.js';

const productManager = new ProductManager("./src/data/products.json")

const io = new Server(http);

io.on("connection", async (socket) => {
    console.log("Un cliente se conecto!");

    socket.emit("products", await productManager.getProducts())

    socket.on("deleteProduct", async (id) => {
        await productManager.deleteProduct(id)
        io.sockets.emit("products", await productManager.getProducts())
    })

    socket.on("updateProduct", async (product) => {
        await productManager.addProduct(product)
        io.sockets.emit("products", await productManager.getProducts())
    })
});


