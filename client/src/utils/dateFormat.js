// returns the number of days in the month, if the month is february, checks to see if it is a leap year
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

// given a month and year, determines the day of the week the firs tof the month falls on and returns the integer
export const getFirstWeekDay = (monthNum, year) => {
    //console.log("----- getFirstWeekDay ----- dateFormat:65");
    //console.log("monthNum:");
    //console.log(monthNum);
    //console.log("year:");
    //console.log(year);
    const firstDay = new Date(year, monthNum, 1);
    // return first day of the month (numbers 0-6)
    return firstDay.getDay();
};

// given the number of the day of the week, determines and returns the name of the day
export const getDayName = (dayNum) => {
    //console.log("----- dayNum ----- (client/src/utils/dateFormat:71) -----");
    //console.log(dayNum);
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

// given the number of the month, determines and returns the name of the month
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
};

