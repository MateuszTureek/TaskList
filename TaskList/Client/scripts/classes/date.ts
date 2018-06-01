export const days: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

export const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

export default class DateConverter {
    getFullDateToString(date: Date): string {
        let strDate = date.getFullYear() + '-';

        if (date.getMonth().toString().length > 1) strDate += (date.getMonth()+1) + '-';
        else strDate += '0' + (date.getMonth()+1) + '-';

        if (date.getDate().toString().length > 1) strDate += date.getDate();
        else strDate += '0' + date.getDate();

        return strDate;
    };
};