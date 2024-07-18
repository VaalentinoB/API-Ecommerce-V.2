import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "products",
                require: true
            },
            quantity: {
                type: Number,
                require: true
            }
        }
    ]
})


const CartModel = mongoose.model("carts", CartSchema)

export default CartModel