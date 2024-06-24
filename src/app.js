import express from 'express';
import cartsRouter from './routes/carts.routes.js';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from './routes/products.routes.js';
import displayRoutes from 'express-routemap';

const app = express();
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/api/products', productsRouter);
app.use('/api/cart', cartsRouter);
// consume carpeta public
app.use(express.json());
app.use(express.urlencoded({ extends: true }));
app.use(express.static("./src/public"));
// handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");
const io = new Server(http);

app.listen(puerto, () => {
    displayRoutes(app)
    console.log(`Servidor activo en el puerto ${puerto}`);
});


io.on("connection", (socket) => {
    console.log("Un cliente se conecto");

    io.on("mensaje", (data) => {
        mensajes.push(data);

        io.emit("mensajesLogs", mensajes);
    });
});
