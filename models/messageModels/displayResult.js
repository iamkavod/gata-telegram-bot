const emoji = require('node-emoji');
const { DateTime } = require('luxon');

function displayResult(bot, user, winners, participants) {
    const today = DateTime.local().toLocaleString(DateTime.DATE_SHORT);
    const value = winners[user.username] ? winners[user.username] : participants[user.username];
    
    const winData = Object.keys(winners).map(winner => `@${winner}(Lucky No. ${winners[winner]}), `);
    const lossData = Object.keys(participants).slice(0, 20).map(participant => `@${participant}(Lucky No. ${participants[participant]}), `);

    bot.sendMessage(user.id, emoji.emojify(`
        :slot_machine: GATA Bot Raffle :slot_machine:
        ...
    `), {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: emoji.emojify(":phone: Contact :phone:"), callback_data: "4" }],
                [{ text: emoji.emojify("Back To Menu :arrow_left:"), callback_data: "5" }]
            ]
        })
    });
}

module.exports = displayResult;
