const { HolidayRequest } = require("./holiday_service/holiday_request");
const { HolidayResponse } = require("./holiday_service/holiday_response");

async function getHolidays({ year, month }, holidayService) {
    if (year === undefined || month === undefined) {
        return new HolidayResponse([]);
    }
    const holidayRequest = new HolidayRequest(year, month);
    const holidays = await holidayService.fetchHolidays(holidayRequest);
    const holidayResponse = new HolidayResponse(holidays);
    return holidayResponse;
}

module.exports = {
    getHolidays
};