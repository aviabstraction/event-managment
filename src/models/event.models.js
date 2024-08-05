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
    imageurls: [String], 
    address: String,
    whatsapp: Number,
    mobile: Number,
    category: String,
    email: String,
    rating: Number
});

const Event = mongoose.model('Event', eventSchema);

export default Event;