import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts',
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "usuario"],
        default: "usuario"
    }
})


const UsuarioModel = mongoose.model("usuarios", usuarioSchema);

export default UsuarioModel; 