

import mongoose from 'mongoose';

const organizerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const organizer = mongoose.model('organizer', organizerSchema);

export default organizer;
