import { normalize } from "normalizr";
import { getJSON, RSAA } from "redux-api-middleware";
import { chats } from "../../schema/schemas";
import { ADD_CHAT, CHANGE_TITLE, DELETE_CHAT, DELETE_MESSAGE, SEND_MESSAGE, START_CHATS_LOADING, SUCCESS_CHATS_LOADING, ERROR_CHATS_LOADING, BLINCK_CHAT } from "./actionTypes";

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
    };
};

export function loadChats() {
    return {
        [RSAA]: {
            endpoint: '/api/chats.json',
            method: 'GET',
            types: [
                START_CHATS_LOADING, 
                {
                    type:SUCCESS_CHATS_LOADING,
                    payload: (action, state, res) => getJSON(res)
                    .then(json => normalize(json, [chats]))
                },
                ERROR_CHATS_LOADING
            ]
        }
    };
};
