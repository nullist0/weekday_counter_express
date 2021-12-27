const { setup } = require('axios-cache-adapter');
const { Holiday } = require('../holiday_service/holiday');
const { HolidayDataSourceResponse } = require('../holiday_service/holiday_data_source_response');

function OpenAPIHolidayDataSource() {
    const SERVICE_KEY = process.env.SERVICE_KEY;
    const openAPI = setup({
        baseURL: 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService',
        cache: {
            maxAge: 15 * 60 * 1000
        }
    });
    const generateAPIUrl = (year, month) => {
        return `/getRestDeInfo?serviceKey=${SERVICE_KEY}&solYear=${year}&solMonth=${month}`;
    };
    const toHoliday = ({ locdate }) => {
        const year = parseInt(locdate / 10000);
        const month = parseInt(locdate / 100) % 100;
        const day = locdate % 100;
        
        return new Holiday(year, month, day);
    };

    this.getHolidays = async (holidayDataSourceRequest) => {
        const { year, month } = holidayDataSourceRequest;
        const apiUrl = generateAPIUrl(year, month);
        const { data } = await openAPI.get(apiUrl);
    
        if (typeof data !== 'object') return [];
    
        const { response: { body: { items: { item } }} } = data;
        const locdates = item ? [item].flat() : undefined;
        const holidays = locdates?.map(toHoliday) ?? [];
        return new HolidayDataSourceResponse(holidays);
    }
}

module.exports = {
    OpenAPIHolidayDataSource
};