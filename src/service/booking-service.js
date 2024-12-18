const {BookingRepository} = require('../repository/index');
const {FLIGHT_SERVICE_PATH} = require('../config/serverConfig');
const  axios = require('axios');
const ServiceError = require('../utils/errors/service-error');
const { StatusCodes } = require('http-status-codes');


class BookingService {
    constructor()
    {
        this.bookingRepository = new BookingRepository();
    }

    async createBooking(data)
    {
        try {
            const flightId = data.flightId;
            let getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`;
            const response = await axios.get(getFlightRequestURL); 
            const flightData = response.data.data; 
            let price = flightData.price;

            if(data.noOfSeats > flightData.totalSeats)
            {
                throw new ServiceError(
                    "cannot process booking",
                    "insufficient seats",
                    StatusCodes.INTERNAL_SERVER_ERROR
                )
            }
            const totalCost = price* data.noOfSeats;
            data = {...data, totalCost};
            const booking = await this.bookingRepository.create(data);
            let  availableSeats  = flightData.totalSeats -  data.noOfSeats;
            const updateFlightURL = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`;
            await axios.patch(updateFlightURL, {totalSeats : availableSeats});
            const finalBooking = await this.bookingRepository.update(booking.id, {status :"Booked"});
            return finalBooking;

        } catch (error) {
            if(error.name=='RepositoryError' || error.name == 'ValidationError')
            {
                throw error;
            }

            throw new ServiceError();
        }
    }
}


module.exports = BookingService;