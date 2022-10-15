import { getNumDays } from './dateFormat';

// number of milliseconds in one day
const MS_PER_DAY = 86400000;

// given a date (in milliseconds), determines the start of the month and returns the date in milliseconds
export const getMonthStart = (timestamp) => {
    const myTime = new Date(parseInt(timestamp));

    let month = myTime.getMonth();
    let year = myTime.getFullYear();
    
    const monthStart = new Date(year, month, 1, 0, 0, 0, 0);
    const monthStartMS = monthStart.getTime();

    return monthStartMS;
};

// given the date (in milliseconds), determines the last millisecond of the month and returns
export const getMonthEnd = (timestamp) => {
    const myTime = new Date(parseInt(timestamp));

    let month = myTime.getMonth();
    let year = myTime.getFullYear();
    
    const numDays = getNumDays(month, year);

    const monthEnd = new Date(year, month, numDays, 23, 59, 59, 999);

    return monthEnd;
};

// given the date (in milliseconds), determines the first millisecond of the week and returns
export const getWeekStart = (timestamp) => {
    const myTime = new Date(parseInt(timestamp));

    let year = myTime.getFullYear();
    let month = myTime.getMonth();
    const dateNum = myTime.getDate();

    const weekDay = myTime.getDay();
    const sundayDate = dateNum - weekDay;

    const weekStart = new Date(year, month, sundayDate, 0, 0, 0, 0);

    return weekStart;
};

// given the date (in milliseconds), determines the last millisecond of the week and returns
export const getWeekEnd = (timestamp) => {
    const myTime = new Date(parseInt(timestamp));

    let year = myTime.getFullYear();
    let month = myTime.getMonth();
    const dateNum = myTime.getDate();

    const weekDay = myTime.getDay();
    const satOffset = 6 - weekDay;
    const saturdayDate = dateNum + satOffset;

    const weekEnd = new Date(year, month, saturdayDate, 23, 59, 59, 999);

    return weekEnd;
};

// given the date (in milliseconds), determines and returns the first millisecond of the day
export const getDayStart = (timestamp) => {
    const myTime = new Date(parseInt(timestamp));

    let year = myTime.getFullYear();
    let month = myTime.getMonth();
    const dateNum = myTime.getDate();

    const dayStart = new Date(year, month, dateNum, 0, 0, 0, 0);

    return dayStart;
};

// given the date (in milliseconds), determines and returns the last millisecond of the day
export const getDayEnd = (timestamp) => {
    const myTime = new Date(parseInt(timestamp));

    let year = myTime.getFullYear();
    let month = myTime.getMonth();
    const dateNum = myTime.getDate();

    const dayEnd = new Date(year, month, dateNum, 23, 59, 59, 999);

    return dayEnd;
};

// given the date (in milliseconds), determines the current date, sets date to next month, returns new date in milliseconds
export const getNextMonth = (timestamp) => {
    const myTime = new Date(parseInt(timestamp));

    let year = myTime.getFullYear();
    let month = myTime.getMonth();

    if (month === 11) {
        myTime.setFullYear(year++);
        myTime.setMonth(0);
    } else {
        myTime.setMonth(month++);
    }

    const myTimeMS = myTime.getTime();

    return myTimeMS;
};

// given the date (in milliseconds), determines the current date, sets date to previous month, returns new date in milliseconds
export const getPrevMonth = (timestamp) => {
    const myTime = new Date(parseInt(timestamp));

    let year = myTime.getFullYear();
    let month = myTime.getMonth();

    if (month === 0) {
        myTime.setFullYear(year--);
        myTime.setMonth(11);
    } else {
        myTime.setMonth(month--);
    }

    return myTime;
};

// given the date (in milliseconds), adds 7 days (in milliseconds) to change the date to the following week, returns new date in milliseconds
export const getNextWeek = (timestamp) => {

    const nextWeekMS = parseInt(timestamp) + (7 * MS_PER_DAY);
    
    return nextWeekMS;
};

// given the date (in milliseconds), subtracts 7 days (in milliseconds) to change the date ot the previous week, returns new date in milliseconds
export const getPrevWeek = (timestamp) => {
    
    const prevWeekMS = parseInt(timestamp) - (7 * MS_PER_DAY);

    return prevWeekMS;
};

// given the date (in milliseconds), adds 24 hours (in milliseconds) to change the date to the next day, returns new date in milliseconds
export const getNextDay = (timestamp) => {
    
    const nextDayMS = parseInt(timestamp) + (MS_PER_DAY);

    return nextDayMS;
};

// given the date (in milliseconds), subtracts 24 hours (in milliseconds) to change the date to the previous day, returns new date in milliseconds
export const getPrevDay = (timestamp) => {
    
    const prevDayMS = parseInt(timestamp) - (MS_PER_DAY);

    return prevDayMS;
};