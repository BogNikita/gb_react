import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Header from './Header.jsx';
import MessageFiled from './MessageField.jsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import ChatList from './Chatlist.jsx';
import Profile from './Porfile.jsx'




const Layout = (props) => {

    const { chatId = 1 } = props;

    const divStyle = {
        backgroundColor: 'rgb(46 53 53 / 40%)',
        minHeight: '100vh'
    };
   
    const state = {
        chats: {
            1: {title: 'Чат 1', messageList: [1]},
            2: {title: 'Чат 2', messageList: [2]},
            3: {title: 'Чат 3', messageList: []},
        },
        messages: {
            1: { text: "Привет!", author: 'bot' },
            2: { text: "Здравствуйте!", author: 'bot' },
        },
        text: '',
    };

    const path = document.location.pathname;

    const [newState, setState] = useState(state);
    const {chats, messages, text} = newState;

    const handleSendMessage = (message, author) => {
        if (text.length > 0 || author === 'bot') {
            const messageId = Object.keys(messages).length + 1;
            setState({...newState,
                messages: {...messages,
                    [messageId]: {text:message, author}},
                chats: {...chats,
                    [chatId]: { ...chats[chatId],
                        messageList: [...chats[chatId]['messageList'], messageId]
                    }
                },
                text: ''
            })
        }
    };

    const handleChange = (event) => {
        setState({...newState, [event.target.name]: event.target.value });
    };


    useEffect(() => {
        if (Object.values(messages)[Object.values(messages).length - 1].author === 'User') {
            setTimeout(() =>
                handleSendMessage('Не приставай ко мне, я робот!', 'bot'),
            1000);
        }
    }, [Object.keys(messages).length]);


    const createNewChat = () => {
        const chatsId = Object.keys(chats).length + 1;
        setState({...newState,
            chats: {...chats,
                [chatsId]: {title: `Чат ${chatsId}`, messageList: []}
                }
        });
    };


    return( 
    <div style={divStyle}>
     <CssBaseline />
     <Container style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
        <Link to={`/profile/${chatId}/`} style={{width: '100%', textDecoration: 'none', color: 'inherit'}}>
            <Header name={chatId}/>
        </Link>
        <ChatList createNewChat={createNewChat} state={newState} />
        {path === `/profile/${chatId}/` ? <Profile name={chatId}/> : <MessageFiled chatId={chatId} state={newState} handleChange={handleChange} handleSendMessage={handleSendMessage}/>}
     </Container>
    </div>
    )
};

export default Layout;