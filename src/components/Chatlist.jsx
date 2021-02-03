import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { deleteChat } from './store/actions/chats';
import { connect } from 'react-redux';
import {push} from 'connected-react-router';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ButtonAddChat from './ButtonAddChat.jsx';
import { loadMessage } from './store/actions/message.js';




const useStyles = makeStyles((theme) => ({
    root: {
       
    },
    title: {
      margin: theme.spacing(0, 1, 2, 0),
    },
  }));


const ChatList = (props) => {

    const classes = useStyles();
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    };

    const blink = (item) => {
        console.log(item);
        if (Object.keys(props.message).length > 0) {
            if ((props.message[Object.keys(props.message).length].blink) && props.message[Object.keys(props.message).length].chatId === item) {
                return 'blink'
            }
        };
    };

    const linkItem = Object.keys(props.chats).map(item => {
        
        return(
        <div style={{display: 'flex', alignItems: 'center', paddingRight: 5}} key={item}>
            <ListItem button
                    selected={selectedIndex === item}
                    onClick={(event) => {
                        handleListItemClick(event, item)
                        props.navigate(`/chat/${item}/`)
                        }}>
                    <ListItemAvatar>
                        <Avatar>
                        <AccountCircleIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={props.chats[item].title}
                        className={blink(item)}
                    />
            </ListItem>
            <HighlightOffIcon style={{cursor: 'pointer'}} onClick={() => {
                props.deleteChat(item)
                let path = '/'
                if(Object.keys(props.chats)[0]){
                    path = `/chat/${Object.keys(props.chats)[0]}`
                }
                props.push(path);
                }}/>
        </div>     
            )
        }
    );

    return(
        <div className='chat-list'>
                <Typography variant="h6" className={classes.title}>
                    Список контактов
                </Typography>
                <div className={classes.demo}>
                    <List component="nav"
                        aria-labelledby="nested-list-subheader">
                    {linkItem}
                    <ButtonAddChat/>
                    </List>
                </div>
    </div>
    )
};

 function mapStateToProps(state) {
    return {
        chats: state.chatReducer.chats,
        message: state.messagesReducer.messages,
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      push: (link) => dispatch(push(link)),
      deleteChat: (chatId) => dispatch(deleteChat(chatId)),
      loadMessage: () => dispatch(loadMessage())
    };
  };
 

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);