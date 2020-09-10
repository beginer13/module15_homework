export class Chat {
    constructor() {
        this.btnSend = document.querySelector("#btnSendId");
        this.btnPosition = document.querySelector("#btnPositionId");
        this.chatWindow = document.querySelector("#msgDiv");
        this.inputText = document.querySelector(".inpText")
        this.btnSend.addEventListener('click',this._onBtnSendClick.bind(this));
        this.btnPosition.addEventListener('click', this._onSendLocationMessageClick.bind(this));
        this.inputText.addEventListener("keypress", this._onKeyPressedEnter.bind(this));
        this.onSend = null;
    }


    // Event Listenrs -----------------------------------------------------------
    
    _onBtnSendClick () {
        const messageText = this.inputText.value
        this._sendTextMessage(messageText)
    
    };

    _onKeyPressedEnter (keyPressed) {
        if (keyPressed.key == "Enter") {
          const messageText = this.inputText.value
          this._sendTextMessage(messageText);
        }
    };
    
    _sendTextMessage(text) {
        const message = {
            text: text,
            type: "text"
        };
        this.print(message, false);
        this.onSend(message);
    };

    _onSendLocationMessageClick() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition( (position) => {
                const coords = position.coords;
                const message = {
                    lat: coords.latitude,
                    long: coords.longitude,
                    type: "coords"
                }
                this.print(message, false);
                this.onSend(message);
            });
        };
    };

    // ---------------------------------------------------------------------------------
    
    print(message, incoming) {
        const className = incoming ? 'in' : 'out';
        let container;
        
        if (message.type == "text") {
            container = `<div class="message ${className}">${message.text}</div>`;
        } else if (message.type == "coords") {
            // if (incoming == true) { return }
            const linkToMap = `https:www.openstreetmap.org/#map=18/${message.lat}/${message.long}`;
            container = `<div class="message ${className}"><a href="${linkToMap}">Гео-локация</a></div>`;
        } else {
            throw new Error("Unexpected message type: " + message.type);
        }
        
        this.chatWindow.innerHTML = this.chatWindow.innerHTML + container;
    };
};
    