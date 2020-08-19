const Joi = require('@hapi/joi');

const userSchema = Joi.object({
    full_name: Joi.string().min(2).required(),
    email: Joi.string().email().lowercase().required(),
    status: Joi.string().required(),
    password: Joi.string().min(8).required()
});

module.exports = {
    userSchema
};