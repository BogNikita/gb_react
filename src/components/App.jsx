import React, {useState} from 'react';
import ReactDom from 'react-dom';
import Message from './Message.jsx';
import MessageFiled from './MessageField.jsx';


const App = (props) => {;
    const divStyle = {
        maxWidth: '900px',
        margin: '0 auto',
    };

   


return( <main style={divStyle}>
            <MessageFiled/>
        </main>)
};

export default App;