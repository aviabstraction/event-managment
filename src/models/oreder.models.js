import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: Number,
    address: String,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
