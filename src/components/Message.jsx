import React from 'react';

 const Message = ({text, author}) => <div className='message' 
    style={ { alignSelf: author === 'bot' 
    ?'flex-start'
    : 'flex-end' } }
    >
        <div>{text}</div>
        <div style={{fontSize: '12px', 
        alignSelf: author === 'bot' 
        ?'flex-start'
        :'flex-end'}}>
            <i>{author}</i>
        </div>
    </div>
    
 export default Message;

    