# Discord Chatbot

**Description:**
The Discord Chatbot interacts with users on a Discord server, responding to messages and executing commands. Built with Node.js and discord.js.

## Features
- Ping command: Responds with "Pong!"
- Greet command: Sends a greeting message.
- Server info command: Provides server details.

## Tech Stack
- Node.js, discord.js

## Project Structure
1. **Backend (Node.js)**
    - `index.js` (Main file)
    - `commands/ping.js`
    - `commands/greet.js`
    - `commands/server.js`
    - `events/ready.js`
    - `events/messageCreate.js`
    - `config.json`
2. **Configuration Files**
    - `package.json`
    - `.env`

## Getting Started

### Prerequisites
- Node.js and npm

### Installation
1. Clone the repository:

    ```sh
    git clone https://github.com/EnzoFarias4/discord-chatbot.git
    cd discord-chatbot
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory:

    ```
    DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN
    ```

4. Configure the bot prefix in `config.json`:

    ```json
    {
      "prefix": "!"
    }
    ```

5. Run the bot:

    ```sh
    npm start
    ```

## Usage
- **Ping:** `!ping` - responds with "Pong!"
- **Greet:** `!greet [name]` - greets the user.
- **Server Info:** `!server` - provides server information.

## Contributing
Fork the repository, create a new branch, and submit a pull request.

---

Enjoy your Discord Chatbot! 🤖
