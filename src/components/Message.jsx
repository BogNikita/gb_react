import React from 'react';

 const Message = ({text, author}) => <div className='message' 
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
    </div>
    
 export default Message;

    