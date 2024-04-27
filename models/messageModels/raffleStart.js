const { Markup } = require('telegraf');

function raffleStart(bot, callbackQuery) {
    const chatId = callbackQuery.message.chat.id;

    // Initialize an empty array to store user-selected numbers
    let selectedNumbers = [];

    // Function to generate number buttons from 1 to 100
    function generateNumberButtons() {
        const buttons = [];
        for (let i = 1; i <= 100; i++) {
            buttons.push(Markup.button.callback(String(i), `select_${i}`));
        }
        return buttons;
    }

    // Function to update the message with selected numbers
    function updateMessage() {
        const message = `You have selected the following numbers: ${selectedNumbers.join(', ')}`;
        const keyboard = Markup.inlineKeyboard([
            ...generateNumberButtons(),
            Markup.button.callback('Confirm Selection', 'confirm'),
            Markup.button.callback('Clear Selection', 'clear'),
        ]).extra();
        bot.editMessageText(message, { chat_id: chatId, message_id: callbackQuery.message.message_id, parse_mode: 'HTML', ...keyboard });
    }

    // Handle callback query
    bot.on('callback_query', (query) => {
        const data = query.data;
        if (data.startsWith('select_')) {
            const number = parseInt(data.split('_')[1]);
            if (selectedNumbers.length < 5 && !selectedNumbers.includes(number)) {
                selectedNumbers.push(number);
                updateMessage();
            }
        } else if (data === 'confirm') {
            // Logic for confirming selection
            const message = `You have confirmed your selection: ${selectedNumbers.join(', ')}. Submitting...`;
            bot.editMessageText(message, { chat_id: chatId, message_id: callbackQuery.message.message_id, parse_mode: 'HTML' });
            // Call function to handle submission
            handleSubmission(selectedNumbers);
        } else if (data === 'clear') {
            // Clear selected numbers
            selectedNumbers = [];
            updateMessage();
        }
    });

    // Initial message with number buttons
    const initialMessage = 'Please select up to 5 numbers:';
    const keyboard = Markup.inlineKeyboard([
        ...generateNumberButtons(),
        Markup.button.callback('Confirm Selection', 'confirm'),
        Markup.button.callback('Clear Selection', 'clear'),
    ]).extra();
    bot.sendMessage(chatId, initialMessage, keyboard);
}

module.exports = { raffleStart };
