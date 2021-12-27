const express = require('express');
const cors = require('cors');
const { OpenAPIHolidayDataSource } = require('./lib/holiday_data_source/open_api_holiday_data_source');
const { HolidayService } = require('./lib/holiday_service/holiday_service');
const { getHolidays } = require('./lib/routers');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: "https://nullist0.github.io",
  optionsSuccessStatus: 200
}));

app.get('/holidays/:year/:month', async (req, res) => {
  const holidayDataSource = new OpenAPIHolidayDataSource();
  const holidayService = new HolidayService(holidayDataSource);
  const holidayResponse = await getHolidays(req.params, holidayService);

  res.status(200).json({
    dates: holidayResponse.holidays
  });
});

app.listen(port);