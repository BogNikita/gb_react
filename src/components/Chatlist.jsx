import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const useStyles = makeStyles((theme) => ({
    root: {
        border: '1px solid #ccc',
        
    },
    title: {
      margin: theme.spacing(4, 0, 2),
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
                    {[0,1,2].map(item => {return (
                        <ListItem button
                            key = {item}
                            selected={selectedIndex === item}
                            onClick={(event) => handleListItemClick(event, item)}>
                            <ListItemAvatar>
                                <Avatar>
                                <AccountCircleIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={'Bot:' + item}
                            />
                        </ListItem>
                    )})}
                    </List>
                </div>
    </div>
    )
}

export default ChatList;