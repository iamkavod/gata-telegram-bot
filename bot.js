// bot.js
const TelegramBot = require('node-telegram-bot-api');
const { beginning } = require('./models/message');
const { handleCallback } = require('./handlers/callBackHandler');
const config = require('./config');

const bot = new TelegramBot(config.token, { polling: true });

bot.onText(/\/start/, (msg) => {
    beginning(bot, msg);
});

bot.on('callback_query', (callbackQuery) => {
    handleCallback(bot, callbackQuery);
});

console.log("Bot running.....");
