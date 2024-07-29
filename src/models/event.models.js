import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    _id: Number,
    organizationname: String,
    eventname: String,
    imageurl: String,
    eventdescription: String,
    price: Number,
    about: String,
    about_img: String,
    imageurls: [String], // Renamed to avoid conflict with `imageurl`
    address: String,
    whatsapp: Number,
    mobile: Number,
    category: String,
    email: String,
    rating: Number
});

const Event = mongoose.model('Event', eventSchema);

export default Event;