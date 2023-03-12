const Joi = require('joi');

// using joi package to validate data
function validateUserJoi(req, res, next) {
    const joiUserSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(8).max(30).required(),
        username: Joi.string().alphanum().min(1).max(30).required(),
    });

    const { error, value } = joiUserSchema.validate(req.body);
    if (error) {
        res.status(422).send({
            message: error,
            success: false,
        });
    } else {
        next(); //if validation is successful, it moves to the next program
    }
}

module.exports = validateUserJoi;
