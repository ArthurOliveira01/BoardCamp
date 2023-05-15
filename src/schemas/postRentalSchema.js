import Joi from "joi";

export const postRentalSchema = Joi.object({
    customerId: Joi.number().required().integer(),
    gameId: Joi.number().required().integer(),
    daysRented: Joi.number().min(1).integer()
});