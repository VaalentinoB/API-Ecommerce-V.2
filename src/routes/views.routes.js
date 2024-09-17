import express from "express";
import passport from "passport";
import { soloUser, soloAdmin } from "../routes/auth/auth.js";
import productController from "../controllers/products.controllers.js";

const router = express.Router();


router.get("/products", passport.authenticate("jwt", { session: false }), soloUser, async (req, res) => {
    try {
        const { page = 1, limit = 2 } = req.query;
        
        const productos = await productController.getProducts(req, res);
    } catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).json({
            status: 'error',
            error: "Error interno del servidor"
        });
    }
});

// Ruta para obtener carrito por ID
router.get("/carts/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        // Usar el controlador del carrito para obtenerlo por ID
        const carrito = await cartController.getCarritoById(cartId);

        if (!carrito) {
            console.log("No existe ese carrito con el id");
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        const productosEnCarrito = carrito.products.map(item => ({
            product: item.product.toObject(),
            // Lo convertimos a objeto para pasar las restricciones de Exp Handlebars. 
            quantity: item.quantity
        }));

        res.render("carts", { productos: productosEnCarrito });
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Ruta para renderizar login
router.get("/login", (req, res) => {
    res.render("login");
});

// Ruta para renderizar registro
router.get("/register", (req, res) => {
    res.render("register");
});

// Ruta para productos en tiempo real (solo admins)
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
