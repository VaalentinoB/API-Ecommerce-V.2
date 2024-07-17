import CartModel from "./data/cart.model";



class CartManager {

    async crearCarrito() {
        try {
            const nuevoCarrito = new CartModel({ products: [] })
            await nuevoCarrito.save()
            return nuevoCarrito
        } catch (error) {
            console.log("Error al Crear carrito", error);
        }
    }

    async getCarritoById(cartId) {
        try {

            const carrito = await CartModel.findById(cartId)

            if (!carrito) {
                throw new Error(`No existe un carrito con el id ${cartId}`);
            } else {
                return carrito;

            }

        } catch (error) {
            console.error("Error al obtener el carrito por ID", error);
            throw error;
        }
    }

    async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
        try {
            const carrito = await this.getCarritoById(cartId)

            const existe = carrito.products.find(item => item.product.toString() === productId)
            if (existe) {
                existe.quantity += quantity
            } else {
                carrito.products.push({ product: productId, quantity })
            }
            carrito.markModified("products")
            await carrito.save()
            return carrito

        } catch (error) {
            console.log("Error al agrefar producto", error);
        }
    }
}

export default CartManager;