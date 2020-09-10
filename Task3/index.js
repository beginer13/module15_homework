import { Tube } from './tube.js';
import { Chat } from './chat.js';

const tube = new Tube();
const chat = new Chat();

tube.onReceive = (message) => {
    chat.print(message, true);
}

chat.onSend = (message) => {
    tube.send(message);
}