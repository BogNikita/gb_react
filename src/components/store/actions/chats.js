import { ADD_CHAT, CHANGE_TITLE, DELETE_CHAT, DELETE_MESSAGE, SEND_MESSAGE } from "./actionTypes";

export function sendMessage(messageId, chatId) {
    return {
        type: SEND_MESSAGE,
        messageId,
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
    };
};

export function deleteChat(chatId) {
    return {
        type: DELETE_CHAT,
        chatId
    };
};

export function deleteMessage(chatId, messageId) {
    return {
        type: DELETE_MESSAGE,
        chatId,
        messageId
    }
}
