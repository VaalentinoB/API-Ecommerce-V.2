import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        type: String

    },
    price: {
        type: Number,
        required: true
    },
    thumbnails: {
        type: [String]
    }
})


const ProductModel = mongoose.model("products", ProductSchema)

export default ProductModel
