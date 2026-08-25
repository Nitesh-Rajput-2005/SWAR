import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOTP = async (email, otp) => {

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "SWAR - Email Verification OTP",

        html: `
            <div style="font-family: Arial, sans-serif;">
                <h2>Welcome to SWAR 🎵</h2>

                <p>Your email verification OTP is:</p>

                <h1 style="letter-spacing: 8px;">
                    ${otp}
                </h1>

                <p>This OTP will expire in <b>5 minutes</b>.</p>

                <p>
                    If you did not request this OTP,
                    you can safely ignore this email.
                </p>
            </div>
        `
    };

    await transporter.sendMail(mailOptions);
};

export default sendOTP;