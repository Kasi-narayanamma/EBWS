const loginContainer = document.getElementById('login-container');
const chatContainer = document.getElementById('chat-container');
const loginButton = document.getElementById('login-button');
const sendButton = document.getElementById('send-button');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message-input');
const messagesDiv = document.getElementById('messages');

let username = '';

// WebSocket connection
const socket = new WebSocket('ws://localhost:8080/ws');

socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    const messageElement = document.createElement('div');
    messageElement.textContent = ${message.sender}: ${message.content};
    messagesDiv.appendChild(messageElement);
};

loginButton.addEventListener('click', () => {
username = usernameInput.value;
    if (username) {
        loginContainer.classList.add('hidden');
        chatContainer.classList.remove('hidden');
    }
});

sendButton.addEventListener('click', () => {
    const content = messageInput.value;
    if (content) {
        const message = { sender: username, content };
        socket.send(JSON.stringify(message));
        messageInput.value = '';
    }
});
