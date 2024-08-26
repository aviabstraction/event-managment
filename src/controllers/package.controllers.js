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
        const filteredPackages = await Package.find(baseFilter);
        return res.status(200).json(new ApiResponse(
            200,
            filteredPackages,
            'Packages fetched successfully'
        ));

    } catch (error) {
            return res.status(500).json(new ApiError(
            500,
            null,
            'Internal Server Error, please provide valid credentials'
        ));
    }
};

const createPackage = async (req, res) => {

    try {
    const {
        organizationName,
        customised,
        packageName,
        packageTagline,
        packageDescription,
        address,
        whatsapp,
        mobile,
        category,
        email,
        rating,
        experience,
        city,
        totalPackagePrice
    } = req.body;

    const packagesLists = [];
    let packageImage = '';

    if (Array.isArray(req.body.packagesLists)) {
        req.body.packagesLists.forEach(() => {
            packagesLists.push({});
        });
    }

    req.files.forEach(file => {
        if (file.fieldname === 'packageImage') {
            packageImage = file.path;
        } else {
            const fieldParts = file.fieldname.split('][');
            const index = parseInt(fieldParts[0].replace('packagesLists[', ''), 10);
            const field = fieldParts[1].replace(']', '');

            if (field === 'eventPhotos') {
                packagesLists[index][field] = file.path;
            }
        }
    });

    req.body.packagesLists.forEach((item, index) => {
        for (const key in item) {
            if (key !== 'eventPhotos') {
                packagesLists[index][key] = item[key];
            }
        }
    });

    const newPackage = {
        organizationName,
        customised,
        packageName,
        packageTagline,
        packageDescription,
        address,
        whatsapp,
        mobile,
        category,
        email,
        rating: parseInt(rating, 10),
        experience: parseInt(experience, 10),
        city,
        totalPackagePrice: parseFloat(totalPackagePrice),
        packageImage,
        packagesLists
    };

    console.log(newPackage);
    

    const packageData = new Package(newPackage);

    packageData.save()
        .then((savedPackage) => {
            console.log('Package saved successfully:', savedPackage);
            res.status(201).json({ message: 'Package created and saved successfully', package: savedPackage });
        })
        .catch((err) => {
            console.error('Error saving package:', err);
            res.status(500).json({ message: 'Error saving package' });
        });

} catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating package' });
}
};

  export { filterPackage ,createPackage};
 