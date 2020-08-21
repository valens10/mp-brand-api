import Joi from '@hapi/joi';

module.exports.userSchema = Joi.object({
    full_name: Joi.string().min(2).required(),
    email: Joi.string().email().lowercase().required(),
    status: Joi.string().required(),
    password: Joi.string().min(8).required()
});

module.exports.userLoginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required()
});
