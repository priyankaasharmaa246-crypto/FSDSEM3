const EventEmitter = require("events");

class Element extends EventEmitter {
    constructor(name, parent = null) {
        super();
        this.name = name;
        this.parent = parent;
    }

    addEventListener(type, handler) {
        this.on(type, handler);
    }

    removeEventListener(type, handler) {
        this.off(type, handler);
    }

    dispatchEvent(type, data = {}) {
        const event = {
            type,
            target: this,
            currentTarget: this,
            data,
            stopped: false,
            stopPropagation() {
                this.stopped = true;
            }
        };

        let currentElement = this;

        while (currentElement) {
            event.currentTarget = currentElement;
            currentElement.emit(type, event);

            if (event.stopped) {
                break;
            }

            currentElement = currentElement.parent;
        }
    }
}

const documentElement = new Element("document");
const form = new Element("form", documentElement);
const button = new Element("button", form);

function clickHandler(event) {
    console.log(
        `${event.currentTarget.name} received ${event.type} event | target: ${event.target.name}, currentTarget: ${event.currentTarget.name}`
    );
}

documentElement.addEventListener("click", clickHandler);
form.addEventListener("click", clickHandler);
button.addEventListener("click", clickHandler);

console.log("\n--- Scenario A ---");
button.dispatchEvent("click");

console.log("\n--- Scenario B ---");

function stopFormPropagation(event) {
    console.log("Form calls stopPropagation()");
    event.stopPropagation();
}

form.addEventListener("click", stopFormPropagation);
button.dispatchEvent("click");

console.log("\n--- Scenario C ---");

form.removeEventListener("click", stopFormPropagation);
button.removeEventListener("click", clickHandler);
button.dispatchEvent("click");

console.log("\n--- Keypress ---");

function keypressHandler(event) {
    console.log(`${event.currentTarget.name} received ${event.type} event`);
}

form.addEventListener("keypress", keypressHandler);
form.dispatchEvent("keypress", { key: "Enter" });