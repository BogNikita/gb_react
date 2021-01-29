import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import chatReducer from "./chats";
import messagesReducer from "./messages"

export default (history) => combineReducers({
    router: connectRouter(history),    
    chatReducer,
    messagesReducer
});