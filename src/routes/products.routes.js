import express from "express";
const router = express.Router();

import ProductManager from "../dao/db/product-manager-db.js";
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        const productos = await productManager.getProducts({
            limit: parseInt(limit),
            page: parseInt(page),
            sort,
            query,
        });

        res.json({
            status: 'success',
            payload: productos,
            totalPages: productos.totalPages,
            prevPage: productos.prevPage,
            nextPage: productos.nextPage,
            page: productos.page,
            hasPrevPage: productos.hasPrevPage,
            hasNextPage: productos.hasNextPage,
            prevLink: productos.hasPrevPage ? `/api/products?limit=${limit}&page=${productos.prevPage}&sort=${sort}&query=${query}` : null,
            nextLink: productos.hasNextPage ? `/api/products?limit=${limit}&page=${productos.nextPage}&sort=${sort}&query=${query}` : null,
        });

    } catch (error) {
        console.error("Error al obtener productos", error);
        res.status(500).json({
            status: 'error',
            error: "Error interno del servidor"
        });
    }
});



router.get("/:pid", async (req, res) => {
    const id = req.params.pid;

    try {
        const producto = await productManager.getProductById(id);
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
        await productManager.updateProduct(id, productActualizado);
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
        await productManager.deleteProduct(id);
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