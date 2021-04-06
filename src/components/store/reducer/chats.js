import { ADD_CHAT, SEND_MESSAGE, CHANGE_TITLE, DELETE_CHAT, DELETE_MESSAGE, SUCCESS_MESSAGES_LOADING, SUCCESS_CHATS_LOADING } from "../actions/actionTypes";

const initialState = {
    chats: {
        1: {title: 'Чат 1', messageList: []},
        2: {title: 'Чат 2', messageList: []},
        3: {title: 'Чат 3', messageList: []},
    },
    isLoading: true
};

export default function chatReducer(state = initialState, action) {
    const newState = {...state};
    switch (action.type) {
        // case SUCCESS_MESSAGES_LOADING: {
        //     const chats = {...state.chats};
        //     action.payload.forEach(msg => {
        //         const { id, chatId } = msg;
        //         chats[chatId].messageList.push(id);
        //     });
        //     return ({
        //         ...state,
        //         chats: {...state.chats, ...chats}
        //     })
        // };
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
            const chatsId = +Object.keys(state.chats)[Object.keys(state.chats).length-1]+1 || 1;
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
            });
        case SUCCESS_CHATS_LOADING: {
            const chats = {...state.chats};
            action.payload.result.forEach(item => {
                action.payload.entities.chats[item]['messageList'].forEach((id, i, messageList) => {
                    chats[item].title =  action.payload.entities.chats[item].title;
                    if(!chats[item].messageList.includes(id)) {
                        chats[item].messageList.push(id);
                    }
                });
                
            });
            return({
                ...state,
                chats: {...state.chats, ...chats},
                isLoading: false
            });
        };
        default:
            return state
    }
}