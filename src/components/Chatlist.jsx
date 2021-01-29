import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { addChat, deleteChat } from './store/actions/chats';
import { connect } from 'react-redux';
import {push} from 'connected-react-router';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


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
                        className={props.message[props.message.length-1].blink && props.message[props.message.length-1].chatId === item ? 'blink' : null}
                    />
            </ListItem>
            <HighlightOffIcon style={{cursor: 'pointer'}} onClick={() => {
                props.push('/');
                props.deleteChat(item)}}/>
        </div>     
            )
        }
    );

    return(
        <div className={classes.root} className='chat-list'>
                <Typography variant="h6" className={classes.title}>
                    Список контактов
                </Typography>
                <div className={classes.demo}>
                    <List component="nav"
                        aria-labelledby="nested-list-subheader"
                        className={classes.root}>
                    {linkItem}
                    <div style={{display: 'flex', justifyContent: 'center', marginTop: 5}}>
                        <Fab color="inherit" aria-label="add" size="small" onClick={props.addChat}>
                            <AddIcon />
                        </Fab>
                    </div>
                    </List>
                </div>
    </div>
    )
};

 function mapStateToProps(state) {
    return {
        chats: state.chatReducer.chats,
        message: state.messagesReducer
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      addChat: () => dispatch(addChat()),
      push: (link) => dispatch(push(link)),
      deleteChat: (chatId) => dispatch(deleteChat(chatId))
    };
  };
 

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);