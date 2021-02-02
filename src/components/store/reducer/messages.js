import { ADD_MESSAGE_TO_LIB, DELETE_MESSAGE_IN_LIB } from "../actions/actionTypes";

const initialState = [
    { text: "Привет!", author: 'bot', blink: false },
    { text: "Здравствуйте!", author: 'bot', blink: false }
];

export default function messagesReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_MESSAGE_TO_LIB: {
            if(state[state.length-1].author === action.author && action.author === 'bot') return state
                return [...state, {text: action.text, author: action.author, blink:action.blink, chatId: action.chatId}]
            };
        case DELETE_MESSAGE_IN_LIB: {
            state.splice(action.messageId)
            return [...state]
        }
        default:
            return state
    };
};