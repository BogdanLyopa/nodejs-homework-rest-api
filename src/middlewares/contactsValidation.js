const Joi = require('joi')

const schemaAddContact = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string()
    .regex(/^[()0-9]/)
    .min(7)
    .max(13)
    .required(),
  favorite: Joi.boolean().optional(),
})

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .optional(),
  phone: Joi.string()
    .regex(/^[()0-9]/)
    .min(7)
    .max(13)
    .optional(),
  favorite: Joi.boolean().optional(),
})

const schemaUpdateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
})

const validate = (schema, body, next) => {
  const { error } = schema.validate(body)

  if (error) {
    const [{ message }] = error.details
    return next({ message })
  }
  next()
}

module.exports.validateCreateContact = (req, res, next) => {
  return validate(schemaAddContact, req.body, next)
}

module.exports.validateUpdateStatusContact = (req, res, next) => {
  return validate(schemaUpdateStatusContact, req.body, next)
}

module.exports.validateUpdateContact = (req, res, next) => {
  return validate(schemaUpdateContact, req.body, next)
}
