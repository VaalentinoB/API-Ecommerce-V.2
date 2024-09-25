import express from 'express';
import CartController from '../controllers/cart.controllers.js';

const router = express.Router();

router.post('/', CartController.crearCarrito);
router.get('/:cartId', CartController.getCarritoById);
router.post('/:cartId/producto/:productId', CartController.agregarProductoAlCarrito);
router.delete('/:cartId/producto/:productId', CartController.eliminarProductoDelCarrito);
router.delete('/:cartId', CartController.eliminarTodosLosProductos);
router.get('/:cartId/view', CartController.viewCarrito);
router.get('/:cid/purchase', CartController.FinalizarCompra);
export default router;