
const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    name: String,
     email: String,
    contact: Number,
    address: String,
    
});

module.exports= mongoose.model('Order', orderSchema);