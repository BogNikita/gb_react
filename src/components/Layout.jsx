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




const Layout = (props) => {

    const { chatId = 1 } = props;

    const divStyle = {
        backgroundColor: 'rgb(46 53 53 / 40%)',
        minHeight: '100vh'
    };
   
    const state = {
        messages: {
            1: { text: "Привет!", author: 'bot' },
            2: { text: "Здравствуйте!", author: 'bot' }
        }
    };

    const path = document.location.pathname;

    const [stateMessages, setMessages] = useState(state.messages);
    
    const sendMessage = (message, author) => {
        if (message.trim().length > 0 || author === 'bot') {
            // const messageId = Object.keys(stateMessages).length + 1;
            const messageId = (Date.now());

               setMessages((prev) => {
                    return {...prev,
                        [messageId]: {text: message, author}}
                    });
                props.sendMessage(messageId, message, author, chatId);
        };
    };

    useEffect(() => {
        if (Object.values(stateMessages)[Object.values(stateMessages).length - 1].author === 'User') {
            setTimeout(() => {
                sendMessage('Не приставай ко мне, я робот!', 'bot')},1000)
        }
        
    }, [Object.values(stateMessages)[Object.values(stateMessages).length - 1].author !== 'bot']);

    return( 
    <div style={divStyle}>
     <CssBaseline />
     <Container style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        <Link to={`/profile/${chatId}/`} style={{width: '100%', textDecoration: 'none', color: 'inherit'}}>
            <Header name={props.state.chats[chatId].title}/>
        </Link>
        <ChatList/>
        {path === `/profile/${chatId}/` 
        ? <Profile chatId={chatId} name={props.state.chats[chatId].title}/> 
        : <MessageFiled chatId={chatId} sendMessage={sendMessage} messages={stateMessages}/>}
     </Container>
    </div>
    )
};

function mapStateToProps(state) {
    return {
        state: state.chatReducer
    };
};

function mapDispatchToProps(dispatch) {
    return {
        sendMessage: (messageId,text,author,chatId) => dispatch(sendMessage(messageId,text,author,chatId))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout));
