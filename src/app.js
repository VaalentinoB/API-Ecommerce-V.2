import express from 'express';
import cartsRouter from './routes/carts.routes.js';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';
import productsRouter from './routes/products.routes.js';
import displayRoutes from 'express-routemap';
import viewsRouter from "./routes/views.routes.js"

const app = express();
const puerto = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("./src/public"));
app.use("/", viewsRouter)


app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");




app.use('/api/products', productsRouter);
app.use('/api/cart', cartsRouter);






app.listen(puerto, () => {
    displayRoutes(app)
    console.log(`Servidor activo en el puerto ${puerto}`);
});



