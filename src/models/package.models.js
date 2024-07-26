
import mongoose ,{Schema} from "mongoose";

const packages = new mongoose.Schema(
    {
    
    organizationName: { type: String, required: true },
    customised: { type: String, required: true, enum: ['yes', 'no'] },
    packageName: { type: String, required: true },
    packagesLists: [{
      description: { type: String, required: true },
      eventPhotos: { type: String, required: true },
      price: { type: Number, required: true }
    }],
    eventDescription: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true },
    whatsapp: { type: Number, required: true },
    mobile: { type: Number, required: true },
    category: { type: String, required: true },
    email: { type: String, required: true },
    rating: { type: Number, required: true }

}
)

export const Package = mongoose.model("packages", packages);
