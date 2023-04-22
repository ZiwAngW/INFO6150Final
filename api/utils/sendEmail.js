import Mailgun from "mailgun.js";
import formData from "form-data";


const mailgun = new Mailgun(formData);
const title = 'Booking Confirmation';
const DOMAIN = 'mail.slinks.page';
const template = 'booking_confirm';


export const sendEmail = (email, userName, bookingNum, bookingDate, hotelName, roomTitle, bookingCity, roomPrice) => {
    console.log(`email: ${email}, userName: ${userName}, bookingNum: ${bookingNum}, bookingDate: ${bookingDate}, hotelName: ${hotelName}, roomTitle: ${roomTitle}, bookingCity: ${bookingCity}, roomPrice: ${roomPrice}`);
    // log everything function parameter to the console in json formatç    
const client = mailgun.client({ username: 'api', key: process.env.MAILGUN_API_KEY });
const data = {
    from: 'Booking Confirmation <bookings@mail.slinks.page>',
    to: email,
    subject: title,
    "template": template,
    't:variables': JSON.stringify({ // be sure to stringify your payload
        "title": title,
        "booking_num": bookingNum,
        "booking_date": bookingDate,
        "hotel_name": hotelName,
        "room_title": roomTitle,
        "booking_city": bookingCity,
        "room_price": roomPrice,
        "room_price_final": roomPrice + 10,
        "user_email": email,
        "user_name": userName
    })
};

console.log(data);

client.messages.create(DOMAIN, data).then((res) => {
    console.log(res);
})
    .catch((err) => {
        console.error(err);
    });

}
