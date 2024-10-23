const mongoose = require('mongoose');

const roommateSchema = new mongoose.Schema({
    place: { type: String, required: true },
    description: { type: String, required: true },
    rent: { type: Number, required: true },
    image: [{ type: String, required: true }],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    lookingGender: { type: String, enum: ["male", "female", "Any"], required: true },
    occupancy: { type: String, enum: ["Single", "Shared", "Any"], required: true },
    highlights: [{
        type: String,
        enum: propertyHighlights,
        required: true,
        validate: {
            validator: function (value) {
                return value.length >= 3;
            },
            message: "Please select at least three highlights.",
        },
    }],
}, { timestamps: true });

module.exports = mongoose.model('Roommate', roommateSchema);