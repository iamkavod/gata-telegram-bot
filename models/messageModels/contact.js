const emoji = require('node-emoji');

function contact(bot, callbackQuery) {
    const { message: { chat: { id } } } = callbackQuery;
    
    bot.sendMessage(id, emoji.emojify(`
        :fire: GATA Bot Contact :fire:
        ...
    `), {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: emoji.emojify("Back To Menu :arrow_left:"), callback_data: "2" }]
            ]
        })
    });
}

module.exports = contact;
