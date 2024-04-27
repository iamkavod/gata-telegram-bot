const { DateTime } = require('luxon');

const luckyNumbers = Array.from({ length: 30 }, () => Math.floor(Math.random() * 500) + 1);
const drawNumbers = Array.from({ length: 500 }, (_, i) => i + 1);
const winners = {};
const participants = {};

function performLottery(user) {
    if (!participants[user.username]) {
        const userNumber = drawNumbers.splice(Math.floor(Math.random() * drawNumbers.length), 1)[0];
        participants[user.username] = userNumber;

        if (luckyNumbers.includes(userNumber)) {
            winners[user.username] = userNumber;
        }
    }
}

module.exports = { performLottery };
