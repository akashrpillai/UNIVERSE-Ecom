const nodeEmailer = require("nodemailer");

const sendEmail = async (options) => {
    const transPorter = nodeEmailer.createTransport({
        host: process.env.SMPT_HOST, // Optional
        port: process.env.SMPT_PORT, // optional
        service: process.env.SMPT_SERVICE,
        secure: false,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD
        },
        debug: false,
        // logger: true

    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message
    }
    await transPorter.sendMail(mailOptions);

}




module.exports = sendEmail;