import { ADD_CHAT, CHANGE_TITLE, SEND_MESSAGE } from "./actionTypes";

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
};

export function changeTitle(title, chatId) {
    return {
        type: CHANGE_TITLE,
        title,
        chatId
    }
}