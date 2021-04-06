import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import { deleteMessage } from '../store/actions/chats';
import { deleteMessageFromLib } from '../store/actions/message';
import { connect } from 'react-redux';
import classes from './message.module.css';

 const Message = ({text, author, messageId, chatId, deleteMessage, deleteMessageFromLib}) => (
    <div className={classes.message}
      style={ { alignSelf: author === 'bot' 
      ?'flex-start'
      : 'flex-end' } }
      >
          <span className={classes['message-text']}>{text}</span>
          <span className={classes['message-author']} style={{ 
          alignSelf: author === 'bot' 
          ?'flex-start'
          :'flex-end'}}>
              <i>{author}</i>
          </span>
          <ClearIcon
          onClick={() => {
              deleteMessage(chatId, messageId)
              deleteMessageFromLib(messageId)
          }}
          />
    </div>)
    
 function mapDispatchToProps(dispatch) {
    return {
      deleteMessage: (chatId, messageId) => dispatch(deleteMessage(chatId, messageId)),
      deleteMessageFromLib: (messageId) => dispatch(deleteMessageFromLib(messageId))
    };
  };
 

export default connect(null, mapDispatchToProps)(Message);

    