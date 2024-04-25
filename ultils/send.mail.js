import nodemailer from "nodemailer";
import { EMAIL, CONNECT_KEY } from "./contranst";

const sendMail = async ({ email, subject, html }) => {

    if (!EMAIL || !CONNECT_KEY) {
        console.error("Email or Connect key is null");
        return null;
    }
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: 'Gmail',
        auth: {
            user: EMAIL,
            pass: CONNECT_KEY,
        },
    });

    const message = {
        from: 'ADMIN FROM BOOKSTORE',
        to: email,
        subject: subject,
        html: html,
    };

    const result = await transporter.sendMail(message);

    return result;
};

module.exports = {
    sendMail,
}