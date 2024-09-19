import express from "express";
import passport from "passport";
import { soloUser, soloAdmin } from "../routes/auth/auth.js";
import productController from "../controllers/products.controllers.js";

const router = express.Router();

router.get("/products", passport.authenticate("jwt", { session: false }), soloUser, async (req, res) => {
    try {
        const productos = await productController.getProducts(req); 

        
        res.render('products', {
            products: productos.payload.docs,  
            totalPages: productos.totalPages,
            currentPage: productos.page,
            hasPrevPage: productos.hasPrevPage,
            hasNextPage: productos.hasNextPage,
            prevLink: productos.prevLink,
            nextLink: productos.nextLink
        });
        
        console.log('Productos obtenidos:', productos.payload);
    } catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).json({
            status: 'error',
            error: "Error interno del servidor"
        });
    }
});


router.get("/carts/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        
        const carrito = await cartController.getCarritoById(cartId);

        if (!carrito) {
            console.log("No existe ese carrito con el id");
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        const productosEnCarrito = carrito.products.map(item => ({
            product: item.product.toObject(),
            
            quantity: item.quantity
        }));

        res.render("carts", { productos: productosEnCarrito });
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


router.get("/login", (req, res) => {
    res.render("login");
});


router.get("/register", (req, res) => {
    res.render("register");
});


router.get("/realtimeproducts", passport.authenticate("jwt", { session: false }), soloAdmin, (req, res) => {
    try {
        res.render("realtimeproducts");
    } catch (error) {
        console.error("Error al mostrar los productos", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

export default router;
