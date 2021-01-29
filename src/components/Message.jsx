import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import { deleteMessage } from './store/actions/chats';
import { deleteMessageFromLib } from './store/actions/message';
import { connect } from 'react-redux';

 const Message = ({text, author, messageId, chatId, deleteMessage, deleteMessageFromLib}) => <div className='message'
    style={ { alignSelf: author === 'bot' 
    ?'flex-start'
    : 'flex-end' } }
    >
        <div style = {{whiteSpace: 'pre-line', textAlign: 'end'}}>{text}</div>
        <div style={{fontSize: '12px', 
        alignSelf: author === 'bot' 
        ?'flex-start'
        :'flex-end'}}>
            <i>{author}</i>
        </div>
        <ClearIcon style={{fontSize:'smaller'}}
        onClick={() => {
            deleteMessage(chatId, messageId)
            // deleteMessageFromLib(messageId)
        }}
        />
    </div>
    
 function mapDispatchToProps(dispatch) {
    return {
      deleteMessage: (chatId, messageId) => dispatch(deleteMessage(chatId, messageId)),
      deleteMessageFromLib: (messageId) => dispatch(deleteMessageFromLib(messageId))
    };
  };
 

export default connect(null, mapDispatchToProps)(Message);

    