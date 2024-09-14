import express from 'express';
import cartsRouter from './routes/carts.routes.js';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import productsRouter from './routes/products.routes.js';
import displayRoutes from 'express-routemap';
import viewsRouter from "./routes/views.routes.js"
import ProductManager from './dao/db/product-manager-db.js';
import sessionsRouter from './routes/sessions.routes.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import "./database.js"
import initializePassport from './config/passport.config.js';
const app = express();
const puerto = 8080;



// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./src/public"));
app.use("/", viewsRouter)
app.use(cookieParser())
app.use(passport.initialize());
initializePassport()

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");




app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use("/api/sessions", sessionsRouter)






const http = app.listen(puerto, () => {
    displayRoutes(app)
    console.log(`Servidor activo en el puerto ${puerto}`);
});




const io = new Server(http); 

const productManager = new ProductManager();

io.on("connection", async (socket) => {
    console.log("Un Cliente se ha conectado");

    // Enviar productos al conectar
    const productos = await productManager.getProducts();
    socket.emit("productos", productos);

    socket.on("eliminarProducto", async (id) => {
        await productManager.deleteProduct(id);
        const productosActualizados = await productManager.getProducts();
        io.sockets.emit("productos", productosActualizados);
    });

    socket.on("agregarProducto", async (producto) => {
        await productManager.addProduct(producto);
        const productosActualizados = await productManager.getProducts();
        io.sockets.emit("productos", productosActualizados);
    });
});

