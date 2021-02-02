import React from 'react';
import {Link} from 'react-router-dom';
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
import { addChat } from './store/actions/chats';
import { connect } from 'react-redux';


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



    return(
        <div className={classes.root} className='chat-list'>
                <Typography variant="h6" className={classes.title}>
                    Список контактов
                </Typography>
                <div className={classes.demo}>
                    <List component="nav"
                        aria-labelledby="nested-list-subheader"
                        className={classes.root}>
                    {Object.keys(props.chats).map(item => {return (
                        <Link to={`/chat/${item}/`} key = {item} style={{textDecoration: 'none', color: 'inherit'}}>
                            <ListItem button
                                selected={selectedIndex === item}
                                onClick={(event) => handleListItemClick(event, item)}>
                                <ListItemAvatar>
                                    <Avatar>
                                    <AccountCircleIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={props.chats[item].title}
                                />
                            </ListItem>
                        </Link>
                    )})}
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
    };
  };
  
  function mapDispatchToProps(dispatch) {
    return {
      addChat: () => dispatch(addChat())
    };
  };
 

export default connect(mapStateToProps, mapDispatchToProps)(ChatList);