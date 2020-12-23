import React from 'react';
import ReactDom from 'react-dom';
import Message from './Message.jsx';


const App = (props) => {
    let arr = [];

    const MessageTest = (props) => {
        return props.arr.map((item, index) => <Message key={index} text={item} />)
    }


    const click = e => {
        arr.push('test');
        ReactDom.render(
            <MessageTest arr = { arr } />,
            document.getElementById('root1')
        )
    };

    

return( <main>
        <button onClick={click}>test</button>
        <ul id="root1"></ul>
        </main>)
};

export default App;