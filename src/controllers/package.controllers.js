import { ApiResponse } from "../utils/ApiResponse.js";
import { Package } from "../models/package.models.js";
import { ApiError } from "../utils/ApiError.js";




const filterPackage = async (req, res) => {
    try {
        const { category, city, startPrice, endPrice,_id } = req.query;

        let baseFilter = {};

        if (category) {
            baseFilter.category = category;
        }
        if (_id) {
            baseFilter._id = _id;
        }
        if (city) {
            baseFilter.city = city;
        }

        let priceFilter = {};

        if (startPrice !== undefined && !isNaN(parseFloat(startPrice))) {
            priceFilter['$gte'] = parseFloat(startPrice);
        }

        if (endPrice !== undefined && !isNaN(parseFloat(endPrice))) {
            priceFilter['$lte'] = parseFloat(endPrice);
        }

        if (Object.keys(priceFilter).length > 0) {
            baseFilter.totalPackagePrice = priceFilter;
        }

        console.log("Query Parameters:", req.query);
        console.log("Constructed Filter Object:", baseFilter);

        const filteredPackages = await Package.find(baseFilter);
console.log(filteredPackages);

        return res.status(200).json(new ApiResponse(
            200,
            filteredPackages,
            'Packages fetched successfully'
        ));

    } catch (error) {
        console.error('Error in filterPackage:', error);
        return res.status(500).json(new ApiError(
            500,
            null,
            'Internal Server Error, please provide valid credentials'
        ));
    }
};



  export { filterPackage };
 