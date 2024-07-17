import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                require: true
            },
            quantity: {
                type: Number,
                require: true
            }
        }
    ]
})


const CartModel = mongoose.model("cart", CartSchema)

export default CartModel