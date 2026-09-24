const EventEmitter = require("events");

// Custom SessionManager class extending EventEmitter
class SessionManager extends EventEmitter {
    constructor() {
        super();

        // 1. Handle "greet" event
        this.on("greet", (username) => {
            console.log(`Hello, ${username}! Welcome.`);
        });

        // Handle "exit" event
        this.on("exit", (code) => {
            console.log(`Session closed with code ${code}. Goodbye!`);
        });

        // 2. Once listener on "greet"
        this.once("greet", () => {
            console.log("First login of the day");
        });

        // 6. Error listener
        this.on("error", (message) => {
            console.log(`Error: ${message}`);
        });
    }

    // 3. Trigger only greet and exit events
    trigger(command, ...args) {
        if (command === "greet" || command === "exit") {
            this.emit(command, ...args);
        } else {
            console.log(`Unknown event: ${command}`);
        }
    }
}


// Create a SessionManager object
const session = new SessionManager();


// 4. Emit greet three times with different usernames
session.trigger("greet", "Alice");
session.trigger("greet", "Bob");
session.trigger("greet", "Charlie");

// Print current listener count for greet
console.log(
    `Current greet listener count: ${session.listenerCount("greet")}`
);


// 5. Emit exit with code 0
session.trigger("exit", 0);

// Trigger an unknown event
session.trigger("login");


// 6. Emit an error event with a custom message
session.emit("error", "Something went wrong while managing the session.");