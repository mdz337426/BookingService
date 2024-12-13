const {StatusCodes} = require('http-status-codes');
const { ValidationError } = require('sequelize');

class ServiceError extends Error{

     constructor(
        message = 'Something went wrong',
        explanation = "something went wrong",
        statusCodes = StatusCodes.INTERNAL_SERVER_ERROR )
    {
        super();
        this.name = 'ServiceError';
        this.message = message;
        this.explanation = explanation;
        this.StatusCodes = statusCodes;
    }
}

module.exports = ServiceError;