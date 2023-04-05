const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const joi = BaseJoi.extend(extension)

module.exports.campgroundValidation = joi.object({
    username: joi.string(),
    password: joi.string(),
    campground: joi.object({
        title: joi.string().required().escapeHTML(),
        price: joi.number().required().min(0),
        location: joi.string().required().escapeHTML(),
        description: joi.string().required().escapeHTML(),
    }).required(),
    deleteImages: joi.array()
})

module.exports.reviewValidation = joi.object({
    username: joi.string(),
    password: joi.string(),
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        body: joi.string().required().escapeHTML()
    }).required()
})

module.exports.contactValidation = joi.object({
    username: joi.string(),
    password: joi.string(),
    contact: joi.object({
        name: joi.string().required().escapeHTML(),
        email: joi.string().required().escapeHTML(),
        subject: joi.string().required().escapeHTML(),
        description: joi.string().required().escapeHTML()

    }).required()
})

