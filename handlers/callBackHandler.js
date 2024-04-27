// handlers/callbackHandler.js
const emoji = require("node-emoji");
const { raffleStart } = require('../models/messageModels/raffleStart');

function handleCallback(bot, callbackQuery) {
  const { data } = callbackQuery;
  const chatId = callbackQuery.message.chat.id;

  switch (data) {
    case "website":
      bot.answerCallbackQuery(callbackQuery.id).then(() => {
        bot
          .sendMessage(
            chatId,
            "Here is the website link: [GATA Protocol](https://gataprotocol.org)",
            {
              parse_mode: "Markdown",
              disable_web_page_preview: false, // Enable web page preview
            }
          )
          .then((sentMessage) => {
            const messageId = sentMessage.message_id;
            const websiteUrl = "https://gataprotocol.org";

            // Open the website URL automatically
            bot.editMessageReplyMarkup(
              {
                inline_keyboard: [[{ text: "Open Website", url: websiteUrl }]],
              },
              {
                chat_id: chatId,
                message_id: messageId,
              }
            );
          });
      });
      break;
    case "raffle": // Change the case to match "raffle"
      raffleStart(bot, callbackQuery); // Call raffleStart function
      break;
    case "discord":
      bot.answerCallbackQuery(callbackQuery.id).then(() => {
        bot
          .sendMessage(
            chatId,
            "Here is link to our discord channel: [GATA Protocol](https://discord.com/channels/1044837816082898944/1045211498961715210)",
            {
              parse_mode: "Markdown",
              disable_web_page_preview: false, // Enable web page preview
            }
          )
          .then((sentMessage) => {
            const messageId = sentMessage.message_id;
            const websiteUrl =
              "https://discord.com/channels/1044837816082898944/1045211498961715210";

            // Open the website URL automatically
            bot.editMessageReplyMarkup(
              {
                inline_keyboard: [[{ text: "OpenDiscord", url: websiteUrl }]],
              },
              {
                chat_id: chatId,
                message_id: messageId,
              }
            );
          });
      });
      break;
    case "help":
      // Get user's message
      const userMessage = callbackQuery.message.text;

      // Define the admin's chat ID (replace 'adminChatId' with the actual chat ID of the admin)
      const adminChatId = "adminChatId";

      // Send the user's message to the admin
      bot
        .sendMessage(adminChatId, `User's message for help:\n${userMessage}`)
        .then(() => {
          // Notify the user that their message has been forwarded to the admin
          bot.sendMessage(
            callbackQuery.message.chat.id,
            "Your message for help has been forwarded to the admin."
          );
        })
        .catch((error) => {
          console.error("Error forwarding message to admin:", error);
          bot.sendMessage(
            callbackQuery.message.chat.id,
            "There was an error while forwarding your message to the admin. Please try again later."
          );
        });
      break;

    case "suggestions":
      // Send a message indicating that suggestions are coming soon
      bot
        .sendMessage(
          callbackQuery.message.chat.id,
          "Suggestions feature is not yet active, check back later"
        )
        .then((sentMessage) => {
          // Schedule the deletion of the message after 20 seconds
          setTimeout(() => {
            // Edit the message to add the splash out effect
            bot
              .editMessageText("This message will disappear shortly.", {
                chat_id: callbackQuery.message.chat.id,
                message_id: sentMessage.message_id,
                parse_mode: "Markdown",
              })
              .then((editedMessage) => {
                // Schedule the deletion of the edited message after a short delay
                setTimeout(() => {
                  bot.deleteMessage(
                    callbackQuery.message.chat.id,
                    editedMessage.message_id
                  );
                }, 1000); // 1 second delay before deleting the edited message
              });
          }, 19000); // 19 seconds in milliseconds (20 seconds minus 1 second)
        });
      break;

    default:
      bot.sendMessage(chatId, "Wrong Input Content!!");
      break;
  }
}

module.exports = { handleCallback };
