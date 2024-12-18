const { StatusCodes } = require('http-status-codes');
const {BookingService} = require('../service/index');
const { AppError } = require('../utils/errors');
const bookingService = new BookingService();


const create =async (req, res)=>{
    try {
        const response = await bookingService.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            data : response,
            success: 'true',
            message : 'successfully created the booking',
            err:{}
        })
    } catch (error) {
      
       return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success:'false',
        data : req.body,
        message : error.message,
        err : error.explanaiton
       });
    }
}
 

module.exports = {create};