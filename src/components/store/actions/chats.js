import { ADD_CHAT, SEND_MESSAGE } from "./actionTypes";

export function sendMessage(messageId, text, author, chatId) {
    return {
        type: SEND_MESSAGE,
        messageId,
        text,
        author,
        chatId
    };
};

export function addChat(title) {
    return {
        type: ADD_CHAT,
        title
    }
}