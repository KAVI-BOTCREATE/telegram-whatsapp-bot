const TelegramBot = require('node-telegram-bot-api');
const { Client, LocalAuth } = require('whatsapp-web.js');
const fs = require('fs');
const dotenv = require('dotenv');
const { chromium } = require('playwright');

dotenv.config();

// Telegram Bot Token
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const WHATSAPP_TARGET_NUMBER = process.env.WHATSAPP_TARGET_NUMBER;

const telegramBot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

// Initialize WhatsApp Web client
const whatsappClient = new Client({
    authStrategy: new LocalAuth({ clientId: "telegram-whatsapp-bot" }),
    puppeteer: {
        browserWSEndpoint: async () => {
            const browser = await chromium.launch();
            return browser.wsEndpoint();
        }
    }
});

// WhatsApp client ready
whatsappClient.on('ready', () => {
    console.log('WhatsApp client is ready!');
});

// WhatsApp client authentication
whatsappClient.on('authenticated', (session) => {
    console.log('WhatsApp client authenticated!');
});

// Handle incoming Telegram messages
telegramBot.on('message', (msg) => {
    const chatId = msg.chat.id;

    if (msg.document) {
        telegramBot.getFileLink(msg.document.file_id).then((fileUrl) => {
            telegramBot.downloadFile(msg.document.file_id, './downloads').then((filePath) => {
                const caption = `New document from Telegram: ${msg.document.file_name}`;

                whatsappClient.sendMessage(WHATSAPP_TARGET_NUMBER + '@c.us', caption, { media: fs.readFileSync(filePath) }).then(() => {
                    console.log('Document sent to WhatsApp');
                    fs.unlinkSync(filePath);
                }).catch((error) => {
                    console.error('Error sending document to WhatsApp:', error);
                });
            }).catch((error) => {
                console.error('Error downloading document:', error);
            });
        }).catch((error) => {
            console.error('Error getting file link:', error);
        });
    } else {
        telegramBot.sendMessage(chatId, 'Please send a document to forward to WhatsApp.');
    }
});

// Initialize WhatsApp client
whatsappClient.initialize();
