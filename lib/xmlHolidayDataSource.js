const axios = require('axios');
const { format } = require('date-fns');

// const ServiceKey = '';
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
    const apiUrl = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?serviceKey=${ServiceKey}&solYear=${params.year}&solMonth=${params.month}`;

    const { data } = await axios.get(apiUrl);
    console.log(data);
    const { response: { body: { items: { item } }} } = data;
    const items = item ? [item].flat() : undefined;
    return items?.map(readDate) ?? [];
}

module.exports = {
    getHolidaysIn
}