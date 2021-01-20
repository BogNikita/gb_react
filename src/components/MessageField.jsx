import React, {useState, useEffect} from 'react';
import Message from './Message.jsx';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import SendIcon from '@material-ui/icons/Send';
import { connect } from 'react-redux';

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

const MessageFiled = (props) => {

    const classes = useStyles();

    const pressKey = (e) => {
        if (!e.shiftKey) {
            props.sendMessage(props.text, 'User')
            e.target.value = ''
        }
        
    };

    const submitMessage = (e) => {
        e.preventDefault()
        props.sendMessage(props.text, 'User');
        e.target.reset()
    };   
    
    const messageElements = props.state.chats[props.chatId].messageList.map((messageId, index) => {
        return (<Message 
            key={index} 
            text ={ props.messages[messageId].text }
            author={ props.messages[messageId].author }
            />)})

    return (
        <div style={{width: '80%', background: 'rgb(207, 232, 252)', minHeight: '90vh', display: 'flex', flexDirection: 'column'}}> 
            <div style={{flex: '1 0 auto', display: 'flex', flexDirection: 'column'}}>
               { messageElements }
            </div>
            <form className={classes.root} noValidate autoComplete="off" 
                onSubmit={ e => submitMessage(e)} 
                onChange={ e => props.handleChange(e)}
                onKeyUp={e => e.key === 'Enter' ? pressKey(e) : null}>
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
};

function mapStateToProps(state) {
    return {
       state: state.chatReducer,
   };
 };
 

export default connect(mapStateToProps)(MessageFiled);