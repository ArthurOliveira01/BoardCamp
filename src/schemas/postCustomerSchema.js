import Joi from "joi";

export const postCustomerSchema = Joi.object({
    name: Joi.string().trim().required().min(1),
    phone: Joi.string().trim().pattern(new RegExp('^\\d{10,11}$')).required(),
    cpf: Joi.string().trim().pattern(new RegExp('^\\d{11}$')).required(),
    birthday: Joi.date().required()
})