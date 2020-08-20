import { Tube } from './tube.js'

const btnSend = document.querySelector("#btnSendId");
const btnPosition = document.querySelector("#btnPositionId");
const chatWindow = document.querySelector("#msgDiv");
const inputText = document.querySelector(".inpText");

const tube = new Tube();
tube.onReceive = (message) => {
    writeMessage(message, true);
}

function writeMessage(message, incoming) {
    const className = incoming ? 'in' : 'out';
    let container;
    
    if (message.type == "text") {
        container = `<div class="message ${className}">${message.text}</div>`;
    } else if (message.type == "coords") {
        if (incoming == true) { return }
        const linkToMap = `https:www.openstreetmap.org/#map=18/${message.lat}/${message.long}`;
        container = `<div class="message ${className}"><a href="${linkToMap}">Гео-локация</a></div>`;
    } else {
        throw new Error("Unexpected message type: " + message.type);
    }

    chatWindow.innerHTML = chatWindow.innerHTML + container;
}

btnSend.addEventListener('click', () => {
    const messageText = inputText.value
    sendTextMessage(messageText);
});

inputText.addEventListener("keypress", (keyPressed) => {
  if (keyPressed.key == "Enter") {
    const messageText = inputText.value
    sendTextMessage(messageText);
  }
});

btnPosition.addEventListener('click', sendLocationMessage);

function sendTextMessage(text) {
    const message = {
        text: text,
        type: "text"
    }
    writeMessage(message, false);
    tube.send(message);
};

function sendLocationMessage() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const coords = position.coords;
            const message = {
                lat: coords.latitude,
                long: coords.longitude,
                type: "coords"
            }
            writeMessage(message, false);
            tube.send(message);
        });
    }
};