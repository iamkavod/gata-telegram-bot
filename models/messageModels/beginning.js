const emoji = require('node-emoji');

function beginning(bot, msg) {
    const { chat: { id } } = msg;
    
    bot.sendMessage(id, emoji.emojify(`
        :fire: Welcome to GATA Bot :fire:
    `), {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    { text: emoji.emojify("Website :globe_with_meridians:"), callback_data: "website" },
                    { text: emoji.emojify("Raffle :tickets:"), callback_data: "raffle" },
                    { text: emoji.emojify("Discord :desktop_computer:"), callback_data: "discord" }
                ],
                [
                    { text: emoji.emojify("Help :question:"), callback_data: "help" },
                    { text: emoji.emojify("Suggestions :bulb:"), callback_data: "suggestions" }
                ]
            ]
        })
    });
}

module.exports = beginning;
