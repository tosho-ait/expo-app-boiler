import moment from "moment";

export function nowDay() {
    return Number.parseInt(moment().format("YYYYMMDD"));
}

export function dayToMoment(day) {
    return moment("" + day, "YYYYMMDD");
}

export function momentToDay(moment) {
    return Number.parseInt(moment.format("YYYYMMDD"));
}

export function timestampToDisplayDate(timestamp) {
    return moment(timestamp).format("MMM D, HH:mm");
}

export function timestampToDisplayDateSh(timestamp) {
    return moment(timestamp).format("MMM YYYY");
}

export function displayDate(time) {
    return moment("" + time, 'YYYYMMDD').format("DD MMM YYYY");
}

export function displayMonth(time) {
    return moment("" + time, 'YYYYMMDD').format("MMM YYYY");
}

export function dToD(date) {
    const m = moment(new Date(date));
    return m.format('DD/MM/YYYY');
}