const joi = require("joi");

const registerValidation = joi.object({
    username:joi.string().min(2).required(),
    email:joi.string().email().required(),
    password:joi.string().min(6).required()
})

module.exports = {registerValidation};