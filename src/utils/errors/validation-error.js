const {StatusCodes} = require('http-status-codes')


class ValidationError extends Error{
    constructor()
    {
        super();
        let explanation = [];
        error.errors.forEach(elem => {
            explanation.push(elem.message);
        });

        this.name = "ValidationError";
        this.message = message;
        this.explanation = explanation;
        this.statusCode = statusCode;
    }
}

module.exports = ValidationError;