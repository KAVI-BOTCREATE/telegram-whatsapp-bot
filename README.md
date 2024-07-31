# Telegram to WhatsApp Forwarding Bot using WhatsApp Web

This bot forwards messages from a Telegram bot to a specified WhatsApp contact using WhatsApp Web and `whatsapp-web.js`.

## Features

- Forwards documents from Telegram to WhatsApp.
- Uses Node.js with the `node-telegram-bot-api` and `whatsapp-web.js` libraries.

## Requirements

- Node.js and npm
- A Telegram Bot Token (obtained via BotFather on Telegram)
- Google Chrome browser

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/telegram-whatsapp-bot.git
    cd telegram-whatsapp-bot
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the root directory and add the following:
        ```env
        TELEGRAM_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
        WHATSAPP_TARGET_NUMBER=YOUR_TARGET_NUMBER
        ```

## Running the Bot

To start the bot, run the following command:
```bash
npm start
