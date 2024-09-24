import mongoose from "mongoose";


const ticketSchema = new mongoose.Schema({
    code,
    purchase_datetime,
    amount,
    purchaser
})