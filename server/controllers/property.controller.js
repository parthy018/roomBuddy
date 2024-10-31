// property.controller.js
const Room = require('../models/Room.model');
const sendErrorResponse = require('../utills/sendErrorResponse');
const Roommate=require("../models/roommate.model");

const getAllPropertiesbyPlace = async (req, res) => {
    const { location } = req.params;  // Get location from URL parameter
    const { minRent, maxRent, gender } = req.query; // Additional query parameters for filtering

    if (!location) {
        return sendErrorResponse(res, 'Location is required', 400);
    }

    try {
        // Construct a filter query based on location and optional filters
        const filter = { place: location };

        // Apply optional query filters if they are present
        if (minRent) filter.rent = { $gte: parseInt(minRent) };
        if (maxRent) filter.rent = filter.rent ? { ...filter.rent, $lte: parseInt(maxRent) } : { $lte: parseInt(maxRent) };
        if (gender) filter.lookingGender = gender;

        // Query to find properties and populate owner details
        const properties = await Roommate.find(filter).populate({
            path: 'owner',
            select: 'name profilePicture role',
        }).select('place rent lookingGender');

        // Check if properties were found
        if (!properties.length) {
            return sendErrorResponse(res, `No properties found for ${location}`, 404);
        }

        // Map response data
        const responseData = properties.map((property) => ({
            username: property.owner.name,
            profilePicture: property.owner.profilePicture,
            lookingFor: property.owner.role !== 'seeker' ? 'roommate' : 'to let',
            place: property.place,
            rent: property.rent,
            lookingGender: property.lookingGender,
        }));

        res.status(200).json({ success: true, data: responseData, message: `All properties for ${location}` });
    } catch (error) {
        sendErrorResponse(res, `Failed to fetch properties: ${error.message}`, 500); // Detailed error message
    }
};


const createNeedRoommate = async (req, res) => {
    try {
        const { place, description, rent, owner, lookingGender, occupancy, highlights, amenities } = req.body;

        // Construct the new roommate object
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
        if (req.files && req.files.length > 0) {
            roommateData.images = req.files.map(file => file.path); // Store all image paths in an array
        }

        // Create and save the new roommate entry in the database
        const newRoommate = new Roommate(roommateData);
        await newRoommate.save();

        // Send a success response
        res.status(201).json({ message: 'Roommate listing created successfully!', data: newRoommate });
    } catch (error) {
        console.error("Error creating roommate listing:", error);
        res.status(500).json({ error: 'An error occurred while creating the roommate listing.' });
    }
};
module.exports = { getAllPropertiesbyPlace, createNeedRoommate };
