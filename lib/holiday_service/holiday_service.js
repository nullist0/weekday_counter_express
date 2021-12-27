const { HolidayDataSourceRequest } = require("./holiday_data_source_request");
const { HolidayResponse } = require("./holiday_response");

function HolidayService(holidayDataSource) {
    this.fetchHolidays = async (holidayRequest) => {
        const { year, month } = holidayRequest;
        const holidayDataSourceRequest = new HolidayDataSourceRequest(year, month);
        const holidayDataSourceResponse = await holidayDataSource.getHolidays(holidayDataSourceRequest);
        const { holidays } = holidayDataSourceResponse;
        return new HolidayResponse(holidays);
    };
}

module.exports = {
    HolidayService
};