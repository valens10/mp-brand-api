import Joi from '@hapi/joi';

const userSchema = Joi.object({
    full_name: Joi.string().min(2).required(),
    email: Joi.string().email().lowercase().required(),
    status: Joi.string().required(),
    password: Joi.string().min(8).required()
});

const userLoginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required()
});

export default {
    userSchema,
    userSchema
}
