import { RSAA, getJSON } from "redux-api-middleware";
import { ADD_MESSAGE_TO_LIB, DELETE_MESSAGE_IN_LIB, START_MESSAGES_LOADING, SUCCESS_MESSAGES_LOADING, ERROR_MESSAGES_LOADING } from "./actionTypes";

export function setChatsMessages (messageId, text, author, chatId, blink) {
    return {
        type: ADD_MESSAGE_TO_LIB,
        messageId,
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
    };
};

export function loadMessage() {
    return {
        [RSAA]: {
            endpoint: '/api/messages.json',
            method: 'GET',
            types: [
                START_MESSAGES_LOADING,
                {
                    type: SUCCESS_MESSAGES_LOADING,
                    payload: (action, state, res) => getJSON(res).then(
                        json => json
                    )
                },
                ERROR_MESSAGES_LOADING
            ],
        },
    };
};
