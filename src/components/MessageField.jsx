import React, {useState} from 'react';
import Message from './Message.jsx';

const MessageFiled = () => {
     
    const [state, setState] = useState([]);
    
    const divStyle = {
        height: '85vh',
        border: '1px solid #ccc',
        padding: '10px'
    };


    const submitMessage = (e) => {
        e.preventDefault();
        const message = e.target.text.value;
        setState([...state, {author: 'User', message}]);
        e.target.reset();
    } 

    const componentDidUpdate = () => {
        if (state.length % 2 === 1) {
            setTimeout(() =>
                setState(
                [ ...state, {author: 'Robot', message:'Не приставай ко мне, я робот!'}]),
            1000);
        }
    }
 
    componentDidUpdate();
    return (
        <> 
            <div style={divStyle}>
                {state.map(({author, message}, index) => {
                return (<Message 
                    key={index} 
                    text ={message}
                    author={author}
                    />)})}
            </div>
            <form style={{width: '99%'}} onSubmit={ e => submitMessage(e)}>
                <input type="text" style={{width: "100%", height: '70px', resize: 'none'}} name='text'/>
                
                <button type='submit'>Отправить сообщение</button>
            </form>
        </>
       
        
    )
}

export default MessageFiled;