const daysToMS = (numDays) => {
    const numMS = numDays * 24 * 60 * 60 * 1000;
    return numMS;
}

export const getNumDays = (monthNum, year) => {
    // if the month number is 1, 3, 5, 7, 8, 10, 12 (jan, mar, may, jul, aug, oct, dec), the month has 31 days
    if ([1,3,5,7,8,10,12].includes(monthNum)) {
        return 31;
    }
    // if the month number is 4, 6, 9, 11 (apr, june, sept, nov), the month has 30 days
    if ([4,6,9,11].includes(monthNum)) {
        return 30;
    }
    // if the month number is 2 (february)
    if (monthNum === 2) {
        // check if year is a leap year
        /*
            rules:
                years divisible by 400 ARE leap years
                years divisible by 100 but not by 400 are NOT leap years
                years divisible by 4 but not by 100 ARE leap years
                years not divisible by 4 are NOT leap years 

                if year divisible by 4 ((year % 4) == 0) 
                    if year divisible by 100 ((year % 100) == 0)
                        if year divisible by 400 ((year % 400) == 0)
                            leap year
                        else
                            not leap year
                    else
                        leap year
                else
                    not leap year 
        */
        // boolean variable to indicate whether year is evenly divisible by 4
        var div4 = false;
        // boolean variable to indicate whether year is evenly divisible by 100
        var div100 = false;
        // boolean variable to indicate whether year is evenly divisible by 400
        var div400 = false;
            
        // sets div4 to true if the year is evenly divisible by 4
        if ((year % 4) === 0) {
            div4 = true;
        }
        // sets div100 to true if the year is evenly divisible by 100
        if ((year % 100) === 0) {
            div100 = true;
        }
        // sets div400 to true is the year is evenly divisible by 400
        if ((year % 400) === 0) {
            div400 = true;
        }

        if ((div4 && !div100) || (div4 && div100 && div400)) {
            return 29;
        } else {
            return 28;
        }
    }
};

export const getFirstWeekDay = (monthNum, year) => {
    const firstDay = new Date(year, monthNum, 1);
    // return first day of the month (numbers 0-6)
    return firstDay.getDay();
};

export const getDayName = (dayNum) => {
    console.log("----- dayNum ----- (client/src/utils/dateFormat:71) -----")
    switch (dayNum) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "WeekDayErr";
    }
};

export const getMonthName = (monthNum) => {
    //const monthNum = monthNum;
    switch (monthNum) {
        case 0:
            return "January";
        case 1:
            return "February";
        case 2:
            return "March";
        case 3:
            return "April";
        case 4:
            return "May";
        case 5:
            return "June";
        case 6:
            return "July";
        case 7:
            return "August";
        case 8:
            return "September";
        case 9:
            return "October";
        case 10:
            return "November";
        case 11:
            return "December";
        default:
            return "MonthNameErr";
    }
}


export const getMonthStart = (timeStamp) => {
    const myTime = new Date(timeStamp);

    let month = myTime.getMonth();
    let year = myTime.getFullYear();
    
    const monthStart = new Date(year, month, 1, 0, 0, 0, 0);

    return monthStart;
};

export const getMonthEnd = (timeStamp) => {
    const myTime = new Date(timeStamp);

    let month = myTime.getMonth();
    let year = myTime.getFullYear();
    
    const numDays = getNumDays(month, year);

    const monthEnd = new Date(year, month, numDays, 23, 59, 59, 999);

    return monthEnd;
};

export const getWeekStart = (timeStamp) => {
    const myTime = new Date(timeStamp);

    let year = myTime.getFullYear();
    let month = myTime.getMonth();
    const dateNum = myTime.getDate();

    const weekDay = myTime.getDay();
    const sundayDate = dateNum - weekDay;

    const weekStart = new Date(year, month, sundayDate, 0, 0, 0, 0);

    return weekStart;
};

export const getWeekEnd = (timeStamp) => {
    const myTime = new Date(timeStamp);

    let year = myTime.getFullYear();
    let month = myTime.getMonth();
    const dateNum = myTime.getDate();

    const weekDay = myTime.getDay();
    const satOffset = 6 - weekDay;
    const saturdayDate = dateNum + satOffset;

    const weekEnd = new Date(year, month, saturdayDate, 23, 59, 59, 999);

    return weekEnd;
};

export const getDayStart = (timeStamp) => {
    const myTime = new Date(timeStamp);

    let year = myTime.getFullYear();
    let month = myTime.getMonth();
    const dateNum = myTime.getDate();

    const dayStart = new Date(year, month, dateNum, 0, 0, 0, 0);

    return dayStart;
};

export const getDayEnd = (timeStamp) => {
    const myTime = new Date(timeStamp);

    let year = myTime.getFullYear();
    let month = myTime.getMonth();
    const dateNum = myTime.getDate();

    const dayEnd = new Date(year, month, dateNum, 23, 59, 59, 999);

    return dayEnd;
};

export const getNextMonth = (timeStamp) => {
    const myTime = new Date(timeStamp);

    let year = myTime.getFullYear();
    let month = myTime.getMonth();

    if (month === 11) {
        myTime.setFullYear(year++);
        myTime.setMonth(0);
    } else {
        myTime.setMonth(month++);
    }

    return myTime;
};

export const getPrevMonth = (timeStamp) => {
    const myTime = new Date(timeStamp);

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

export const getNextWeek = (timeStamp) => {
    const myTime = new Date(timeStamp);

    const myTimeMS = myTime.getTime();
    const weekMS = daysToMS(7);

    const nextWeekMS = myTimeMS + weekMS;
    const nextWeek = new Date(nextWeekMS);

    return nextWeek;
};

export const getPrevWeek = (timeStamp) => {
    const myTime = new Date(timeStamp);

    const myTimeMS = myTime.getTime();
    const weekMS = daysToMS(7);

    const prevWeekMS = myTimeMS - weekMS;
    const prevWeek = new Date(prevWeekMS);

    return prevWeek;
};

export const getNextDay = (timeStamp) => {
    const myTime = new Date(timeStamp);

    const myTimeMS = myTime.getTime();
    const dayMS = daysToMS(1);

    const nextDayMS = myTimeMS + dayMS;
    const nextDay = new Date(nextDayMS);

    return nextDay;
};

export const getPrevDay = (timeStamp) => {
    const myTime = new Date(timeStamp);

    const myTimeMS = myTime.getTime();
    const dayMS = daysToMS(1);

    const prevDayMS = myTimeMS + dayMS;
    const prevDay = new Date(prevDayMS);

    return prevDay;
};