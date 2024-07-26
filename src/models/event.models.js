const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    _id: Number,
    organizationname: String,
    eventname: String,
    imageurl: String,
    eventdescription: String,
    price: Number,
    about: String,
    about_img: String,
    imageurl: [String],
    address: String,
    whatsapp: Number,
    mobile: Number,
    category: String,
    email: String,
    rating: Number
});

// export default Order;


module.exports = mongoose.model('Event', eventSchema);

