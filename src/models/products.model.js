import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

// Definir el esquema del producto
const productSchema = new mongoose.Schema({
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
});

//Paginate
productSchema.plugin(paginate);

// Verificar si el modelo ya existe antes de compilar
const ProductModel = mongoose.models.products || mongoose.model("products", productSchema);

export default ProductModel;

