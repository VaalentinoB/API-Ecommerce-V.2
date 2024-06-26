import express from "express";
const router = express.Router();

import ProductManager from "../controllers/productmanager.js";
const productManager = new ProductManager("./src/data/products.json");


router.get("/", async (req, res) => {
    try {
        const limite = req.query.limit;
        const productos = await productManager.getProducts();
        if (limite) {
            res.json(productos.slice(0, limite));
        } else {
            res.json(productos);
        }
    } catch (error) {
        console.error("Error al obtener productos del JSON", error);
        res.status(500).json({
            error: "Error del servidor :("
        });
    }
});


router.get("/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        const producto = await productManager.getProductById(parseInt(id));
        if (!producto) {
            return res.json({
                error: "No se encontro el producto"
            });
        }

        res.json(producto);
    } catch (error) {
        console.error("Error al obtener el producto", error);
        res.status(500).json({
            error: "Error del servidor :("
        });
    }
});


router.post("/", async (req, res) => {
    const newProducto = req.body;

    try {
        await productManager.addProduct(newProducto);
        res.status(201).json({
            message: "EL producto ha sido agregado exitosamente! :)"
        });
    } catch (error) {
        console.error("Error al agregar tu producto :( ", error);
        res.status(500).json({
            error: "Error del servidor :("
        });
    }
});


router.put("/:pid", async (req, res) => {
    const id = req.params.pid;
    const productActualizado = req.body;

    try {
        await productManager.updateProduct(parseInt(id), productActualizado);
        res.json({
            message: "Producto actualizado exitosamente"
        });
    } catch (error) {
        console.error("Error al actualizar producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

router.delete("/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        await productManager.deleteProduct(parseInt(id));
        res.json({
            message: "Producto eliminado exitosamente"
        });
    } catch (error) {
        console.error("Error al eliminar producto", error);
        res.status(500).json({
            error: "Error interno del servidor"
        });
    }
});

export default router;