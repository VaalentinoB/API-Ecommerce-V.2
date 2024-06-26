import { Router } from 'express';
const router = Router();

router.get('/realtimeproducts', async (req, res) => {
    res.render('realtimeproducts');
});



import ProductManager from '../controllers/productmanager.js';
const productManager = new ProductManager("./src/data/products.json")


router.get("/", async (req, res) => {
    try {
        const product = await productManager.getProducts()

        res.render("home", { product })


    } catch (error) {
        res.status(500).send("Error del servidos :(")
    }
})


export default router;