import Joi from 'joi';
const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    categoryId: Joi.string().required(),
})
export default schema;