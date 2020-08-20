export class Tube {
    constructor() {
        this._onMessage = this._onMessage.bind(this);
        this.onReceive = null;
        this.websocket = new WebSocket('wss://echo.websocket.org/');
        this.websocket.onmessage = this._onMessage;
    }

    _onMessage(messageEvent) {
        const json = messageEvent.data;
        const message = JSON.parse(json);
        if (this.onReceive !== null) {
            this.onReceive(message);
        }
    }

    send(message) {
        const json = JSON.stringify(message);
        this.websocket.send(json);
    }
}

const tube1 = new Tube()
const tube2 = new Tube()