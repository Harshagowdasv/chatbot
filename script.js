// script.js

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

let step = 0;
let bookingDetails = {};

sendBtn.addEventListener('click', () => {
    const userMessage = userInput.value;
    if (userMessage.trim()) {
        addUserMessage(userMessage);
        userInput.value = '';
        handleBotResponse(userMessage);
    }
});

function addUserMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('user-message');
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addBotMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('bot-message');
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function handleBotResponse(userMessage) {
    setTimeout(() => {
        if (step === 0) {
            addBotMessage('Which museum would you like to visit?');
            step++;
        } else if (step === 1) {
            bookingDetails.museum = userMessage;
            addBotMessage(`Great choice! What date would you like to visit ${userMessage}?`);
            step++;
        } else if (step === 2) {
            bookingDetails.date = userMessage;
            addBotMessage('How many tickets would you like to book (adult/child)?');
            step++;
        } else if (step === 3) {
            bookingDetails.tickets = userMessage;
            addBotMessage('Tickets are available! Would you like to proceed with payment?');
            step++;
        } else if (step === 4) {
            if (userMessage.toLowerCase() === 'yes') {
                addBotMessage('Please enter your payment details (dummy):');
                step++;
            } else {
                addBotMessage('Okay, feel free to ask me anytime to book tickets.');
                step = 0;
            }
        } else if (step === 5) {
            addBotMessage('Payment successful! Your tickets have been booked. Thank you!');
            console.log(bookingDetails);  // In a real app, you would send the bookingDetails to an API.
            step = 0;
        }
    }, 1000); // Simulate typing delay
}
