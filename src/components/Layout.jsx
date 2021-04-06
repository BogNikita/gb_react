import React, {useState, useEffect} from 'react';
import Header from './Header.jsx';
import MessageFiled from './MessageField.jsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import ChatList from './Chatlist.jsx';
import Profile from './Porfile.jsx'
import { connect } from 'react-redux';
import { loadChats, sendMessage } from './store/actions/chats.js';
import { setChatsMessages, loadMessage } from './store/actions/message.js';
import { push } from 'connected-react-router';
import ButtonAddChat from './ButtonAddChat.jsx';
import CircularProgress from '@material-ui/core/CircularProgress';


const Layout = (props) => {

    const chatId = props.chatId || 1;

    const [path, setPath] = useState('/');

    const divStyle = {
        backgroundColor: 'rgb(46 53 53 / 40%)',
        minHeight: '100vh'
    };

    useEffect(() => {
        // props.loadMessage()
        props.loadChats()
    },[]);

    const sendMessage = (message, author) => {
        if (message.trim().length !== 0) {
            const messageId = +Object.keys(props.messages)[Object.keys(props.messages).length-1]+1;
            props.setChatsMessages(messageId, message, author, chatId, false)
            props.sendMessage(messageId, chatId);
        };
    };

    const handleNavigate = (link) => {
        props.push(link);
        setPath(() => document.location.pathname);
    };

    useEffect(()=> {
        setPath(() => document.location.pathname);
    },[path !== document.location.pathname]);

    return( 
    <div style={divStyle}>
     <CssBaseline />
     <Container style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
         {props.isLoading 
         ?<CircularProgress/>
         : ((Object.keys(props.state.chats) < 1 
            ? (<div style={{display: 'flex', flexDirection: 'column'}}>
                <h1 style={{textAlign: 'center'}}>У вас пока нет чатов</h1>
                <ButtonAddChat/>
            </div>)
            : (
                <>
                <Header navigate={() => handleNavigate(`/profile/${chatId}/`)} name={props.state.chats[chatId].title}/>
                <ChatList navigate={handleNavigate} chatId={chatId}/>
                {path === `/profile/${chatId}/` 
                ? <Profile chatId={chatId}/> 
                : <MessageFiled chatId={chatId} sendMessage={sendMessage}/>}
                </>)
         ))
        }
        
     </Container>
    </div>
    )
};

function mapStateToProps(state) {
    return {
        state: state.chatReducer,
        messages: state.messagesReducer.messages,
        isLoading: state.messagesReducer.isLoading
    };
};

function mapDispatchToProps(dispatch) {
    return {
        sendMessage: (messageId, chatId) => dispatch(sendMessage(messageId, chatId)),
        setChatsMessages: (messageId, text, author, chatId, blink) => dispatch(setChatsMessages(messageId, text, author, chatId, blink)),
        push: (link) => dispatch(push(link)),
        loadMessage: () => dispatch(loadMessage()),
        loadChats: () => dispatch(loadChats())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
