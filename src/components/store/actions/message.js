import { ADD_MESSAGE_TO_LIB, DELETE_MESSAGE_IN_LIB } from "./actionTypes";

export function setChatsMessages (text, author, chatId, blink) {
    return {
        type: ADD_MESSAGE_TO_LIB,
        text,
        author,
        chatId,
        blink
    };
};

export function deleteMessageFromLib(messageId) {
    return {
        type: DELETE_MESSAGE_IN_LIB,
        messageId
    }
}