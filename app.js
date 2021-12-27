const express = require('express');
const cors = require('cors');
const dataSource = require('./lib/openApiHolidayDataSource');
const { format, parse } = require('date-fns');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: "https://nullist0.github.io",
  optionsSuccessStatus: 200
}));

app.get('/holidays', async (req, res) => {
  const { year, month } = req.query;

  if (year === undefined || month === undefined) {
    res.status(404);
    res.json({
      dates: []
    });
  } else {
    const dates = await dataSource.getHolidaysIn(parse(`${year}/${month}/01`, 'yyyy/MM/dd', new Date()));
    res.json({
      dates: dates.map(date => format(date, 'yyyyMMdd'))
    });
  }
});

app.listen(port);