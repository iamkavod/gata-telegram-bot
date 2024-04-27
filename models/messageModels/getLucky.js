const emoji = require('node-emoji');

function getLucky(bot, callbackQuery) {
    const { message: { chat: { id } } } = callbackQuery;
    
    bot.sendMessage(id, emoji.emojify(`
        :fire: GATA Bot Raffle :fire:
        ...
    `), {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: emoji.emojify(":slot_machine: Try Your Luck :slot_machine:"), callback_data: "2" }],
                [{ text: emoji.emojify("Back To Menu :arrow_left:"), callback_data: "3" }]
            ]
        })
    });
}

module.exports = getLucky;
