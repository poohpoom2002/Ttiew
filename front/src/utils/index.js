const formatDate = (date) => {
    const dd = date.slice(8, 10);
    let mm = date.slice(5, 7); // Define mm as a variable using 'let'

    switch (mm) {
        case '01':
            mm = "January";
            break; // Remove 'return mm' and add 'break'

        case '02':
            mm = "February";
            break;

        case '03':
            mm = "March";
            break;

        case '04':
            mm = "April";
            break;

        case '05':
            mm = "May";
            break;

        case '06':
            mm = "June";
            break;

        case '07':
            mm = "July";
            break;

        case '08':
            mm = "August";
            break;

        case '09':
            mm = "September";
            break;

        case '10':
            mm = "October";
            break;

        case '11':
            mm = "November";
            break;

        case '12':
            mm = "December";
            break;

        default:
            mm = "xx";
            break;
    }

    const yy = date.slice(0, 4);

    const dateFormatted = dd + " " + mm + " " + yy;
    return dateFormatted;
};

export { formatDate };
