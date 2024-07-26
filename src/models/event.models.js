import mongoose, { Schema } from "mongoose";


const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      default: "Marriage",
    },
    ageLimit: {
      type: Number,
      default: 18,
    },
  },

  { timestamps: true }

);

const events = new mongoose.Schema({
  organizationName:{
      type:String,
      required:true
  },
  eventName:{
      type:String,
      required:true
  },
  eventPhotos:{
      type:String
  },
  eventDescription:{
      type:String,
      required:true
  },
  price:{
      type:Number,
      required:true
  },
  address:{
      type:String,
      required:true
  },
  whatsapp:{
      type:Number,
  },
  mobile:{
      type:Number,
  },

  email:{
      type:String,
      required:true
  },

  category:{
      type:String,
      required:true
  }

})





// export const Event = mongoose.model("Event", eventSchema);
export const Event = mongoose.model("events", eventSchema);
