import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        default: function() {
            return `TICKET-${Math.random().toString(36).substr(2, 9)}`;
        }
    },
    purchase_datetime: {
        type: Date,
        required: true,
        default: Date.now
    },
    amount: { // Aquí faltaban los dos puntos después de `amount`
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true // Aquí estaba mal escrito como `requiered`
    }
});

const TicketModel = mongoose.model("tickets", ticketSchema);
export default TicketModel;
