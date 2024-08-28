import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  
    organizationname: String,
    eventName: String,
    imageUrl: String,
    eventDescription: String,
    price: Number,
    about: String,
    city:String,
    tagline: String,
    about_img: String,
    imageurl: [String], 
    address: String,
    whatsapp: Number,
    mobile: Number,
    category: String,
    email: String,
    
});

const Event = mongoose.model('Event', eventSchema);

export default Event;