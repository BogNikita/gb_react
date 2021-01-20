import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
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
        },
        text: ''
    };

    const path = document.location.pathname;

    const [newState, setState] = useState(state);

    const sendMessage = (text, author) => {
        if (text.trim().length > 0 || author === 'bot') {
            const { messages } = newState;
            const { chatId } = props;

            const messageId = Object.keys(messages).length + 1;
            setState({...newState,
                messages: {...messages,
                    [messageId]: {text, author}},
            });
            props.sendMessage(messageId, text, author, chatId);
        };
    };

    const handleChange = (event) => {
        setState({...newState, [event.target.name]: event.target.value });
    };

    useEffect(() => {
        if (Object.values(newState.messages)[Object.values(newState.messages).length - 1].author === 'User') {
            setTimeout(() => {
                sendMessage('Не приставай ко мне, я робот!', 'bot')},
            1000);
        }
    }, [Object.values(newState.messages).length]);


    return( 
    <div style={divStyle}>
     <CssBaseline />
     <Container style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        <Link to={`/profile/${chatId}/`} style={{width: '100%', textDecoration: 'none', color: 'inherit'}}>
            <Header name={chatId}/>
        </Link>
        <ChatList/>
        {path === `/profile/${chatId}/` ? <Profile name={chatId}/> : <MessageFiled chatId={chatId} sendMessage={sendMessage} handleChange={handleChange} text={newState.text} messages={newState.messages}/>}
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

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
