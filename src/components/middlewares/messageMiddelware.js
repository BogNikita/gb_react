import { sendMessage } from "../store/actions/chats";
import {ADD_MESSAGE_TO_LIB} from '../store/actions/actionTypes';
import {setChatsMessages} from '../store/actions/message'

export default store => next => action => {
    switch (action.type) {
        case ADD_MESSAGE_TO_LIB:
            const messageId = store.getState().messagesReducer.length + 1;
            if(action.author === 'User') {

                setTimeout( () => {
                    store.dispatch(setChatsMessages('Не приставай ко мне, я робот!', 'bot', action.chatId, true))
                    store.dispatch(sendMessage(messageId, action.chatId));
                }, 1000);

            };
    }; 

    return next(action)
};