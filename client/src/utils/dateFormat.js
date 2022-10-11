
    
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
    if (monthNum == 2) {
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
        if ((year % 4) == 0) {
            div4 = true;
        }
        // sets div100 to true if the year is evenly divisible by 100
        if ((year % 100) == 0) {
            div100 = true;
        }
        // sets div400 to true is the year is evenly divisible by 400
        if ((year % 400) == 0) {
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

export const getWeekDay = (dayNum) => {
    switch (dayNum) {
        case 0:
            return "Sunday";
            break;
        case 1:
            return "Monday";
            break;
        case 2:
            return "Tuesday";
            break;
        case 3:
            return "Wednesday";
            break;
        case 4:
            return "Thursday";
            break;
        case 5:
            return "Friday";
            break;
        case 6:
            return "Saturday";
            break;
        default:
            return "WeekDayErr";
    }
};
