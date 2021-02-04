import { sendMessage } from "../store/actions/chats";
import {ADD_MESSAGE_TO_LIB, DELETE_CHAT} from '../store/actions/actionTypes';
import {deleteMessageFromLib, setChatsMessages} from '../store/actions/message'

export default store => next => action => {
    switch (action.type) {
        case ADD_MESSAGE_TO_LIB:
            const messageId = +Object.keys(store.getState().messagesReducer.messages)[Object.keys(store.getState().messagesReducer.messages).length-1]+2 || 2;
            if(action.author === 'User' ) {
                setTimeout( () => {
                    store.dispatch(setChatsMessages(messageId,'Не приставай ко мне, я робот!', 'bot', action.chatId, true))
                    store.dispatch(sendMessage(messageId, action.chatId));
                }, 1000);
            };
        break;
        case DELETE_CHAT: {
            store.getState().chatReducer.chats[action.chatId].messageList.forEach(id => {
                store.dispatch(deleteMessageFromLib(id))
            })
        }
        break;
    }; 

    return next(action)
};