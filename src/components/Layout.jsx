import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';
import Header from './Header.jsx';
import MessageFiled from './MessageField.jsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import ChatList from './Chatlist.jsx';
import Profile from './Porfile.jsx'
import { connect } from 'react-redux';
import { sendMessage } from './store/actions/chats.js';
import { setChatsMessages } from './store/actions/message.js';
import { push } from 'connected-react-router';




const Layout = (props) => {

    const { chatId = 1 } = props;

    const [path, setPath] = useState('/');

    const divStyle = {
        backgroundColor: 'rgb(46 53 53 / 40%)',
        minHeight: '100vh'
    };

    const sendMessage = (message, author) => {
        if (message.trim().length > 0 || author === 'bot') {
            const messageId = props.messages.length;
            props.setChatsMessages(message, author, chatId, false)
            props.sendMessage(messageId, chatId);
        };
    };

    const handleNavigate = (link) => {
        props.push(link);
        setPath(() => document.location.pathname);
    };

    useEffect(()=> {
        setPath(() => document.location.pathname);
    },[path !== document.location.pathname])

    return( 
    <div style={divStyle}>
     <CssBaseline />
     <Container style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        <Header navigate={() => handleNavigate(`/profile/${chatId}/`)} name={props.state.chats[chatId].title}/>
        <ChatList navigate={handleNavigate}/>
        {path === `/profile/${chatId}/` 
        ? <Profile chatId={chatId}/> 
        : <MessageFiled chatId={chatId} sendMessage={sendMessage}/>}
     </Container>
    </div>
    )
};

function mapStateToProps(state) {
    return {
        state: state.chatReducer,
        messages: state.messagesReducer
    };
};

function mapDispatchToProps(dispatch) {
    return {
        sendMessage: (messageId, chatId) => dispatch(sendMessage(messageId, chatId)),
        setChatsMessages: (text, author, chatId, blink) => dispatch(setChatsMessages(text, author, chatId, blink)),
        push: (link) => dispatch(push(link))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
