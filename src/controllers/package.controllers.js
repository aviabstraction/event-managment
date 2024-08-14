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
        const { category
, filters } = req.query;

         // Check if category is provided
        if (!category
) {
            return res.status(400).json({ message: 'Category is required' });
        }

        // Parse filters from the query (assuming it's sent as a JSON string)
        let filterObject = filters ? JSON.parse(filters) : {};

        // Start with the base filter for exact category match
        let baseFilter = { category: category };
        
        let filteredPackages = await Package.find(baseFilter);
        // Apply additional filters based on the object
        if (filterObject.category) {
            filteredPackages = filteredPackages.filter(pkg => pkg.category === filterObject.category);
        }
        if (filterObject.city) {
            filteredPackages = filteredPackages.filter(pkg => pkg.city === filterObject.city);
        }
        if (filterObject.startPrice !== undefined && filterObject.endPrice !== undefined) {
            filteredPackages = filteredPackages.filter(pkg => pkg.totalPackagePrice >= parseFloat(filterObject.startPrice) && pkg.totalPackagePrice <= parseFloat(filterObject.endPrice));
        } else if (filterObject.startPrice !== undefined) {
            filteredPackages = filteredPackages.filter(pkg => pkg.totalPackagePrice >= parseFloat(filterObject.startPrice));
        } else if (filterObject.endPrice !== undefined) {
            filteredPackages = filteredPackages.filter(pkg => pkg.totalPackagePrice <= parseFloat(filterObject.endPrice));
        }

        // Return the filtered data
        return res.status(200).json({ data: filteredPackages, message: 'Package fetched successfully' });

    } catch (error) {
        console.error('Error in filterPackage:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};


  export { getAllPackages,filterPackage };
 