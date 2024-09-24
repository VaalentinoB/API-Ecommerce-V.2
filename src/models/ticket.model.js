import mongoose from "mongoose";


const ticketSchema = new mongoose.Schema({
    code:{
        type: String,
        required: true,
        unique: true,
        default: function() {
            return `TICKET- ${Math.random().toString()}`
        }
    },
    purchase_datetime: {
        type: Date,
        required: true,
        default: Date.now
    },
    amount {
        type: Number,
        required: true
    },
    purchaser
})