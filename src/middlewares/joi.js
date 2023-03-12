const Joi = require('joi');

// using joi package to validate data
function validateUserJoi(req, res, next) {
    const joiUserSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().alphanum().min(3).max(30).required(),
        username: Joi.string().alphanum().min(3).max(30).required(),
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

//validates input for update
function validateUpdateJoi(req, res, next) {
    const UpdateSchema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string().alphanum().min(3).max(30),
        username: Joi.string().min(3).max(30),
    });

    const { error, value } = UpdateSchema.validate(req.body);
    if (error) {
        res.status(422).send({
            message: error,
            success: false,
        });
    } else {
        next(); //if validation is successful, it moves to the next program
    }
}

//validates input for post
function validatePostJoi(req, res, next) {
    const postSchema = Joi.object({
        postit: Joi.string().alphanum().min(1).max(250),
    });

    const { error, value } = postSchema.validate(req.body);
    if (error) {
        res.status(422).send({
            message: error,
            success: false,
        });
    } else {
        next(); //if validation is successful, it moves to the next program
    }
}

//validates input for comment
function validateCommentJoi(req, res, next) {
    const commentSchema = Joi.object({
        comments: Joi.string().alphanum().min(1).max(250),
    });

    const { error, value } = commentSchema.validate(req.body);
    if (error) {
        res.status(422).send({
            message: error,
            success: false,
        });
    } else {
        next(); //if validation is successful, it moves to the next program
    }
}

module.exports = {
    validateUserJoi,
    validateUpdateJoi,
    validatePostJoi,
    validateCommentJoi,
};
