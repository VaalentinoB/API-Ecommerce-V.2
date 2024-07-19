import ProductManager from '../dao/db/product-manager-db.js';
import CartManager from '../dao/db/cart-manager-db.js';
import { Router } from 'express';

const router = Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

router.get("/realtimeproducts", (req, res) => {
    try {
        res.render("realtimeproducts");
    } catch (error) {
        console.error("Error al mostrar los productos", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});


router.get("/products", async (req, res) => {
    try {
        const { page = 1, limit = 2 } = req.query;
        const productos = await productManager.getProducts({
            page: parseInt(page),
            limit: parseInt(limit)
        });

        if (!productos.docs) {
            throw new Error('No se encontraron productos');
        }

        const nuevoArray = productos.docs.map(producto => {
            const { _id, ...rest } = producto;
            return rest;
        });

        res.render("products", {
            productos: nuevoArray,
            hasPrevPage: productos.hasPrevPage,
            hasNextPage: productos.hasNextPage,
            prevPage: productos.prevPage,
            nextPage: productos.nextPage,
            currentPage: productos.page,
            totalPages: productos.totalPages
        });
    } catch (error) {
        console.log("Error interno del servidor", error);
        res.status(500).json({ status: "error", error: "error interno" });
    }
});

router.get("/carts/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        const carrito = await cartManager.getCarritoById(cartId);

        if (!carrito) {
            console.log("No existe el carrito con el id ingresado");
            return res.status(404).json({ error: "Carrito no encontrado, ya lo encontraras!" });
        }


        if (!carrito.products) {
            console.log("El carrito no contiene productos");
            return res.status(404).json({ error: "No hay productos en el carrito" });
        }


        const productosEnCarrito = carrito.products
            .filter(item => item.product)
            .map(item => ({
                product: item.product.toObject(),
                quantity: item.quantity
            }));
        console.log(productosEnCarrito);

        res.render("carts", { productos: productosEnCarrito });
    } catch (error) {
        console.error("Error al obtener el carrito", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

export default router;
