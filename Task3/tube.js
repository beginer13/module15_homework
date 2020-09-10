export class Tube {
    constructor() {
        this.onReceive = null;
        this.websocket = new WebSocket('wss://echo.websocket.org/');
        this.websocket.onmessage = this._onMessage.bind(this);
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