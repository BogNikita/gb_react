import React, {useState, useEffect} from 'react';
import Message from './Message.jsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        flexShirk: 0,
        paddingBottom: '20px'
      },
    },
    button: {
        margin: theme.spacing(1),
        height: '40px',
        alignSelf: 'flex-end'
      },
    margin: {
        margin: theme.spacing(1),
    }
  }));

const MessageFiled = () => {
    const [stateMessage, setState] = useState([]);

    const classes = useStyles();

    const submitMessage = (e) => {
        e.preventDefault();
        const message = e.target.text.value;
        setState([...stateMessage, {author: 'User', message}]);
        e.target.reset();
    } 

    useEffect(() => {
        if(stateMessage.length) {
            if (stateMessage[stateMessage.length-1].author === 'User') {
                setTimeout(() =>
                    setState(
                    [ ...stateMessage, {author: 'Robot', message:'Не приставай ко мне, я робот!'}]),
                1000);
            }
        }
    })
    
    const pressKey = (e) => {
        if (e.shiftKey) {
            const message = e.target.value;
            setState([...stateMessage, {author: 'User', message}]);
            e.target.value = ''
        }
        
    }


    return (
        <div className='message-field'> 
        <div style={{flex: '1 0 auto', display: 'flex', flexDirection: 'column'}}>
            {stateMessage.map(({author, message}, index) => {
            return (<Message 
                key={index} 
                text ={message}
                author={author}
                />)})}
        </div>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={ e => submitMessage(e)} onKeyUp={e => e.key === 'Enter' ? pressKey(e) : null} wrap="soft">
            <div style={{display: 'flex', marginTop: '10px'}}>
                <TextField
                    id="standard-multiline-flexible"
                    rowsMax={4}
                    multiline
                    fullWidth={ true }
                    name='text'
                /> 
                <Button
                    size="small" 
                    className={classes.margin}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<SendIcon/>}
                    type="submit"
                >
                    Send
                </Button>
            </div>
        </form>
        </div>
    )
}

export default MessageFiled;