// server.js (Node.js example)
const express = require('express');
const twilio = require('twilio');
const app = express();

// Example: Generate a random 4-digit OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000);  // Random 4-digit number
}

app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

app.get('/send-otp', (req, res) => {
    const otp = generateOTP();
    const phoneNumber = req.query.phone;  // Phone number sent as query param

    // Send OTP via SMS using Twilio
    const client = twilio('your_twilio_sid', 'your_twilio_auth_token');
    client.messages.create({
        body: `Your OTP code is ${otp}`,
        from: 'your_twilio_phone_number',
        to: phoneNumber
    }).then(message => {
        res.json({ message: 'OTP sent successfully', otp: otp });  // Just for testing
    }).catch(error => {
        res.status(500).json({ error: 'Failed to send OTP' });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
