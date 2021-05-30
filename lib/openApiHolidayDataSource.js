const { setup } = require('axios-cache-adapter');
const { format } = require('date-fns');
const openapi = setup({
    baseURL: 'http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService',
    cache: {
        maxAge: 15 * 60 * 1000
    }
});
const ServiceKey = process.env.SERVICE_KEY;
  
function readDate({locdate}) {
    const year = locdate / 10000;
    const month = (locdate / 100) % 100;
    const day = locdate % 100;
    
    return new Date(year, month - 1, day);
}

async function getHolidaysIn(month) {
    const params = {
        year: format(month, 'yyyy'),
        month: format(month, 'MM')
    };
    const apiUrl = `/getRestDeInfo?serviceKey=${ServiceKey}&solYear=${params.year}&solMonth=${params.month}`;
    const { data } = await openapi.get(apiUrl);

    if (typeof data !== 'object') return [];

    const { response: { body: { items: { item } }} } = data;
    const items = item ? [item].flat() : undefined;
    return items?.map(readDate) ?? [];
}

module.exports = {
    getHolidaysIn
};