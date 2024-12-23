const { StatusCodes } = require('http-status-codes');
const {BookingService} = require('../service/index');
const { AppError } = require('../utils/errors');
const { createChannel,publishMessage } = require('../utils/messageQueue');
const { REMAINDER_BINDING_KEY } = require('../config/serverConfig');
const bookingService = new BookingService();

class BookingController{

    constructor()
    {
        
        

    }

    async sendMessageToQueue(req, res)
    {
        const channel = await createChannel();

        const payload = {
            data : {
                subject : "This is a noti from queue",
                content : "some queue will subcribe this",
                recepientEmail: "mdz31157@gmail.com",
                notificationTime: new Date()
            },
            service : "CREATE_TICKET"

        }
        publishMessage(channel,REMAINDER_BINDING_KEY,JSON.stringify(payload));
        return res.status(200).json({
            message : 'Successfully published the event'
        })
    }
    

    async create (req, res){
        try {
            const response = await bookingService.createBooking(req.body);
            return res.status(StatusCodes.OK).json({
                data : response,
                success: 'true',
                message : 'successfully created the booking',
                err:{}
            });
        } catch (error) {            
           return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:'false',
            data : req.body,
            message : error.message,
            err : error.explanaiton
           });
        }
    }


}

module.exports = BookingController; 