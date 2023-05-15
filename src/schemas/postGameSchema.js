import Joi from "joi";

export const postGameSchema = Joi.object({
    name: Joi.string().min(1).required(),
    image: Joi.string().required(),
    stockTotal: Joi.number().integer().min(1).required(),
    pricePerDay: Joi.number().integer().min(1).required()
});