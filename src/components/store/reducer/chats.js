import { ADD_CHAT, SEND_MESSAGE, CHANGE_TITLE, DELETE_CHAT, DELETE_MESSAGE } from "../actions/actionTypes";

const initialState = {
    chats: {
        1: {title: 'Чат 1', messageList: [0]},
        2: {title: 'Чат 2', messageList: [1]},
        3: {title: 'Чат 3', messageList: []},
    },
};

export default function chatReducer(state = initialState, action) {
    const newState = {...state};
    switch (action.type) {
        case SEND_MESSAGE:
            if(state.chats[action.chatId].messageList.includes(action.messageId)) return state
                return({...state, 
                    chats: {...state.chats,
                        [action.chatId]: { ...state.chats[action.chatId],
                            messageList: [...state.chats[action.chatId]['messageList'], action.messageId]
                        }
                    },
                });
        case ADD_CHAT:
            const chatsId = Object.keys(state.chats).length + 1;
            return({...state,
            chats: {...state.chats,
                [chatsId]: {title: `Чат ${chatsId}`, messageList: []}
                }
        });
        case CHANGE_TITLE:
            return({...state,
                chats: {...state.chats,
                    [action.chatId]: {title: action.title, messageList: []}
                    }
                });
        case DELETE_CHAT:
            delete newState.chats[action.chatId] 
            return({
                ...newState
            });
        case DELETE_MESSAGE:
            const find = newState.chats[action.chatId].messageList.findIndex((item) => item === action.messageId);
            newState.chats[action.chatId].messageList.splice(find, 1);
            return({
                ...newState
            })
        default:
            return state
    }
}