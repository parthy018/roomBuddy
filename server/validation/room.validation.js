import Joi from "joi";

 const roomValidation = Joi.object({
    place:Joi.string().required(),
    description:Joi.string().required(),
    rent:Joi.number().required(),
    lookingGender:Joi.string().valid("male","female","Any").required(),
    occupancy:Joi.string().valid("Single","Shared","Any").required(),
    highlights: Joi.array().items(
        Joi.string()
    ).min(3).required().messages({
        'array.min': 'Please select at least three highlights.'
    }),
   

});
export {roomValidation};

