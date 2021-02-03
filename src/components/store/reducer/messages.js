import { ADD_MESSAGE_TO_LIB, DELETE_MESSAGE_IN_LIB, START_MESSAGES_LOADING, SUCCESS_MESSAGES_LOADING, ERROR_MESSAGES_LOADING, START_CHATS_LOADING, SUCCESS_CHATS_LOADING, ERROR_CHATS_LOADING, BLINCK_CHAT } from "../actions/actionTypes";

const initialState = {
    messages: {
        // 1:{ text: "Привет!", author: 'bot', blink: false },
        // 2:{ text: "Здравствуйте!", author: 'bot', blink: false }
    },
    isLoading: false
};


export default function messagesReducer(state = initialState, action) {
    const newState = {...state};
    switch (action.type) {
        case ADD_MESSAGE_TO_LIB: {
            if(state.messages.hasOwnProperty(action.messageId)) return state
                return ({...state, 
                    messages: {...state.messages,
                    [action.messageId]:{text: action.text, author: action.author, blink:action.blink, chatId: action.chatId}
                    }
                })
            };
        case DELETE_MESSAGE_IN_LIB: {
            delete newState.messages[action.messageId] 
            return({
                ...newState
            });
        };
        // case START_MESSAGES_LOADING: {
        //     return ({
        //         ...state,
        //         isLoading: true
        //     });
        // };
        // case SUCCESS_MESSAGES_LOADING: {
        //     const messages = {};
        //     action.payload.forEach(msg => {
        //         const {text, author, blink} = msg
        //         messages[msg.id] = { text, author, blink}
        //     });
        //     return ({
        //         ...state,
        //         messages: {...state.messages, ...messages},
        //         isLoading: false
        //     });
        // };
        // case ERROR_MESSAGES_LOADING: {
        //     return({
        //         ...state,
        //         isLoading: false
        //     })
        // }
        case START_CHATS_LOADING: {
            return({
                ...state,
                isLoading: true
            });
        };
        case SUCCESS_CHATS_LOADING: {
            return({
                ...state,
                messages: {...state.messages, ...action.payload.entities.messages},
                isLoading: false
            });
        };
        case ERROR_CHATS_LOADING: {
            return({
                ...state,
                isLoading: false
            });
        };
        default:
            return state
    };
};