import React, {useState, useEffect} from 'react';
import Header from '../header/Header.jsx';
import MessageFiled from '../messagesField/MessageField.jsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import ChatList from '../chatList/Chatlist.jsx';
import Profile from '../profile/Porfile.jsx'
import { connect } from 'react-redux';
import { loadChats, sendMessage } from '../store/actions/chats.js';
import { setChatsMessages, loadMessage } from '../store/actions/message.js';
import { push } from 'connected-react-router';
import ButtonAddChat from '../button/ButtonAddChat.jsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from './layout.module.css';
import InstallPopup from '../InstallPopup/index.jsx';


const Layout = (props) => {

    const chatId = props.chatId || 1;

    const [path, setPath] = useState('/');



    const [visibility, setVisability] = useState(true);
    
    useEffect(() => {
        props.loadChats()
    },[]);

    const sendMessage = (message, author) => {
        if (message.trim().length !== 0) {
            const messageId = +Object.keys(props.messages)[Object.keys(props.messages).length-1]+1 || 1;
            props.setChatsMessages(messageId, message, author, chatId, false)
            props.sendMessage(messageId, chatId);
        };
    };

    const handleNavigate = (link) => {
        props.push(link);
        setPath(() => document.location.pathname);
        setVisability(() => true)
    };

    useEffect(()=> {
        setPath(() => document.location.pathname);
    },[path !== document.location.pathname]);

    const handlerToggleVisability = () => {
        setVisability(() => !visibility)
    };

    const cls = [classes.content];
    
    if(visibility) {
        cls.push(classes.visibility)
    } else {
        cls.push(classes.hide)
    }

    return( 
    <div className={classes.layout}>
     <CssBaseline />
     <Container >
         <div className={classes['layout-wrapper']}>
         {props.isLoading 
         ?<CircularProgress/>
         : ((Object.keys(props.state.chats) < 1 
            ? (<div className={classes['layout-empty']}>
                <h1>У вас пока нет чатов</h1>
                <ButtonAddChat/>
            </div>)
            : (
                <>
                <div className={classes['layout-header']}>
                    <button className={classes['layout-btn']} onClick={handlerToggleVisability}>
                        <span></span>
                    </button>
                    <Header navigate={() => handleNavigate(`/profile/${chatId}/`)} name={props.state.chats[chatId].title}/>
                </div>
                <ChatList navigate={handleNavigate} chatId={chatId} isOpen={visibility}/>
                <div className={cls.join(' ')}>
                    {path === `/profile/${chatId}/` 
                    ? <Profile chatId={chatId} isOpen={visibility}/> 
                    : <MessageFiled chatId={chatId} sendMessage={sendMessage} isOpen={visibility}/>}
                </div>
                </>)
         ))
        }
         </div>
        <InstallPopup/>
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
        loadChats: () => dispatch(loadChats())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
