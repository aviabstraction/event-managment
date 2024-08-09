import { ApiResponse } from "../utils/ApiResponse.js";
import { Package } from "../models/package.models.js";
import { ApiError } from "../utils/ApiError.js";

const getAllPackages = async(req, res) => {

   
    try{
        const Packages = await Package.find(req.query)
        return res
        .status(200)
        .json(new ApiResponse(200, Packages, "package fetched successfully"));

    }catch  {
        return res
          .status( 500)
          .json(new ApiError( 500,null,'Internal Server Error ,provide value credentials'));
      }
    
  };
  

  const filterPackage = async (req, res) => {
    try {
        const { city, startPrice, endPrice, packageName } = req.query;
        let filter = {};

        if (city) filter.city = city;
        if (startPrice !== undefined && endPrice !== undefined) {
            filter.totalPackagePrice = { $gte: parseFloat(startPrice), $lte: parseFloat(endPrice) };
        } else if (startPrice !== undefined) {
            filter.totalPackagePrice = { $gte: parseFloat(startPrice) };
        } else if (endPrice !== undefined) {
            filter.totalPackagePrice = { $lte: parseFloat(endPrice) };
        }
        if (packageName) filter.packageName = { $regex: new RegExp(packageName, 'i') };
          const filterdata = await Package.find(filter);
          return res.status(200).json({ data: filterdata, message: 'Package fetched successfully' });

    } catch (error) {
        console.error('Error in filterPackage:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


  export { getAllPackages,filterPackage };
 