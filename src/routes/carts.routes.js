import express from "express";
import CartManager from "../controllers/cartmanager.js";

const router = express.Router();
const cartManager = new CartManager("./src/data/cart.json");


router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartManager.crearCarrito();
        res.json(nuevoCarrito);
    } catch (error) {
        console.error("Error al crear un carrito", error);
        res.status(500).json({ error: "Error del servidor :(" });
    }
});

router.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);

    try {
        const carrito = await cartManager.getCarritoById(cartId);
        res.json(carrito.products);
    } catch (error) {
        console.error("Error: no se pudo obtener el carrito :/", error);
        res.status(500).json({ error: "Error del servidor :(" });
    }
});

//3) Agregar productos a distintos carritos.
router.post("/:cid/product/:pid", async (req, res) => {
    const carritoId = parseInt(req.params.cid);
    const productoId = req.params.pid;
    const cantidad = req.body.quantity || 1;

    try {
        const actualizarCarrito = await cartManager.agregarProductoAlCarrito(carritoId, productoId, cantidad);
        res.json(actualizarCarrito.products);
    } catch (error) {
        console.error("Error al agregar producto al carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;
