const { validationResult } = require('express-validator/check')

const treatValidationResult = (req, res, next) => {
	const errors = validationResult(req)
    
	if(!errors.isEmpty()) {
		const error = new Error('Validation error, entred data is incorrect')
		error.statusCode = 422
		throw error
	} else {
		next()
	}
}

module.exports = treatValidationResult