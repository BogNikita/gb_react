import { ADD_CHAT, SEND_MESSAGE, CHANGE_TITLE } from "../actions/actionTypes";

const initialState = {
    chats: {
        1: {title: 'Чат 1', messageList: [1]},
        2: {title: 'Чат 2', messageList: [2]},
        3: {title: 'Чат 3', messageList: []},
    },
};

export default function chatReducer(state = initialState, action) {
    switch (action.type) {
        case SEND_MESSAGE:
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
                })
        default:
            return state
    }
}