function isLeapYear(y) {
    return ((y % 4 == 0 && y % 100 != 0) ||
        (y % 400 == 0)) ? 'yes' : 'no';
}
console.log(isLeapYear(2000));
console.log(isLeapYear(2006));
console.log(isLeapYear(2004));