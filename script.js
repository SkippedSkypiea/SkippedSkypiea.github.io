const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/your-function-url', (req, res) => {
    const { ip, location, email } = req.body;

    // Set up email transport
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or your preferred email service
        auth: {
            user: 'your-email@gmail.com', // your email
            pass: 'your-email-password' // your email password
        }
    });

    const mailOptions = {
        from: email,
        to: 'fabegabe26@gmail.com',
        subject: 'New User IP and Location',
        text: `IP: ${ip}\nLocation: ${JSON.stringify(location, null, 2)}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
