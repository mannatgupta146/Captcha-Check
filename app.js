// Simulate OTP for testing purposes (In real application, this will come from the server)
const generatedOTP = "1234"; // Example generated OTP

// JavaScript to handle input focus, navigate through OTP fields
document.querySelectorAll('.digit-group input').forEach(input => {
    input.addEventListener('keyup', function(e) {
        var next = document.querySelector(`#${e.target.dataset.next}`);
        var prev = document.querySelector(`#${e.target.dataset.previous}`);

        if (e.keyCode === 8 || e.keyCode === 37) {
            if (prev) prev.focus();
        } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90)) {
            if (next) next.focus();
        }
    });
});

// Handle OTP form submission
document.getElementById('submit-btn').addEventListener('click', function() {
    // Get the OTP entered by the user
    const userOTP = [
        document.getElementById('digit-1').value,
        document.getElementById('digit-2').value,
        document.getElementById('digit-3').value,
        document.getElementById('digit-4').value
    ].join('');

    // Validate OTP
    if (userOTP === generatedOTP) {
        document.getElementById('message').textContent = 'OTP is correct!';
        document.getElementById('message').style.color = 'green';
    } else {
        document.getElementById('message').textContent = 'Incorrect OTP, please try again.';
        document.getElementById('message').style.color = 'red';
    }
});
