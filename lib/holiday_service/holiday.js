function Holiday(year, month, day) {
    this.year = year;
    this.month = month;
    this.day = day;

    this.toString = () => {
        return year.toString() + month.toString().padStart(2, '0') + day.toString().padStart(2, '0');
    };
};

module.exports = {
    Holiday
};