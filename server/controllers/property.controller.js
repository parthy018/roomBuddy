// property.controller.js

import asyncHandler from "../middleware/asyncHandler.js";
import Room from "../models/Room.model.js";
import sendErrorResponse from "../utils/sendErrorResponse.js";


const getAllPropertiesbyPlace = asyncHandler(async (req, res) => {

    const location = req.params.location.replace(/-/g, " ");
    const { minRent, maxRent, gender } = req.query;

    if (!location) {
        return sendErrorResponse(res, 'Location is required', 400);
    }

    const filter = { place: location };

    if (minRent) filter.rent = { $gte: parseInt(minRent) };
    if (maxRent) filter.rent = filter.rent ? { ...filter.rent, $lte: parseInt(maxRent) } : { $lte: parseInt(maxRent) };
    if (gender) filter.lookingGender = gender;

    const properties = await Roommate.find(filter).populate({
        path: 'owner',
        select: 'name profilePicture role',
    }).select('place rent lookingGender');

    if (!properties.length) {
        return sendErrorResponse(res, `No properties found for ${location}!`, 404);
    }

    const responseData = properties.map((property) => ({
        id: property._id,
        username: property.owner.name,
        profilePicture: property.owner.profilePicture,
        lookingFor: property.owner.role !== 'seeker' ? 'roommate' : 'to let',
        place: property.place,
        rent: property.rent,
        lookingGender: property.lookingGender,
    }));
    res.status(200).json({ success: true, data: responseData, message: `All properties for ${location}` });

});


const createNeedRoommate = asyncHandler(async (req, res) => {

    const { place, description, rent, lookingGender, occupancy, highlights, amenities } = req.body;
    const owner = req.user.userId;
    console.log(owner);
    const roommateData = {
        place,
        description,
        rent,
        owner,
        lookingGender,
        occupancy,
        highlights,
        amenities
    };

    // Check if images are uploaded
    console.log("req.files", req.files);

    if (req.files && req.files.length > 0) {
        roommateData.image = req.files.map(file => file.path);
    }
    const newRoommate = new Roommate(roommateData);
    await newRoommate.save();

    res.status(200).json({ message: 'Roommate listing created successfully!', data: newRoommate });

});


const getPropertyDetailById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const roommateProperty = await Roommate.findById(id).populate({
        path: 'owner',
        select: 'name profilePicture role email gender',
    });

    const roomProperty = await Room.findById(id).populate({
        path: 'owner',
        select: 'name profilePicture role email gender',
    });

    if (!roommateProperty && !roomProperty) {
        return sendErrorResponse(res, "Property details not found", 404);
    }

    if (roommateProperty) {
        return res.status(200).json({
            success: true,
            data: roommateProperty,

        });
    } else {
        return res.status(200).json({
            success: true,
            data: roomProperty,

        })
    }

});



const createNeedRoom = asyncHandler(async (req, res) => {

    const { place, description, rent, lookingGender, occupancy, highlights } = req.body;
    const seeker = req.user.userId;
    const roomData = {
        place,
        description,
        rent,
        seeker,
        lookingGender,
        occupancy,
        highlights
    };
    const newRoom = new Room(roomData);
    await newRoom.save();
    res.status(200).json({ message: "Room listed successfully" });

})

export { getAllPropertiesbyPlace, createNeedRoommate, getPropertyDetailById, createNeedRoom };
