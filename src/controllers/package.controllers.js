import { ApiResponse } from "../utils/ApiResponse.js";
import { Package } from "../models/package.models.js";
import { ApiError } from "../utils/ApiError.js";

const getAllPackages = async(req, res) => {

    /*This Data should be removed and retrieve through DB Query and serve the response from this controller */
    // const Events = await Event.find();
    // throw new ApiError(404, "EventId does not exist");
  
    // const sampleData = [
    //     { event_name: "Royal Marriage",category:'Marriage',packagelist:[{desc:'Mehandhi',price:2000},{desc:'Photshot',price:3000 }], event_date: 20 - 10 - 2026,total:6000 },
    //     { event_name: "traditaional Marriage",category:'Marriage',packagelist:[{desc:'foods',price:2000},{desc:'dress',price:5000 }], event_date: 20 - 10 - 2026,total:7000 },
     
    // ];
  
    try{
        const Packages = await Package.find(req.query)

        if (!Packages || Packages.length === 0) {
            throw new ApiError(404, null,"Package does not exist");
          }
        return res
        .status(200)
        .json(new ApiResponse(200, Packages, "package fetched successfully"));

    }catch  {
        return res
          .status( 500)
          .json(new ApiError( 500,null,'Internal Server Error ,provide value credentials'));
      }
    
  };
  

const filterPackage = async (req,res)=>{

try{

    const {city,startPrice,endPrice,packageName} = req.body
    const filterdata = await Package.find({ city: city,   totalPackagePrice: { $gte: startPrice, $lte: endPrice },   packageName: { $regex: `/${packageName}/`, $options: 'i' } })


 

    if (!filterdata || Packages.length === 0) {
        throw new ApiError(404, null,"Package does not exist");
      }
    return res
    .status(200)
    .json(new ApiResponse(200, filterdata, "package fetched successfully"));

}catch{
    return res
    .status( 500)
    .json(new ApiError( 500,null,'Internal Server Error ,provide value credentials'));
}


 
 
}


  export { getAllPackages,filterPackage };
 