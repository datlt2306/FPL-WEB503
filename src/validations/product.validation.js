// b1: import
import Joi from 'joi'

// b2: schema
const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required()
});

export default schema;