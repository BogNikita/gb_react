import React from 'react';
import Header from './Header.jsx';
import MessageFiled from './MessageField.jsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ChatList from './Chatlist.jsx';



const Layout = (props) => {



    const divStyle = {
        backgroundColor: 'rgb(46 53 53 / 40%)'
    };

   


    return( 
    <div style={divStyle}>
     <CssBaseline />
     <Container maxWidth="sm">
        <Typography component="div" style={{ backgroundColor: '#cfe8fc', minHeight: '100vh', }} className='grid-container'>
        <Header/>
        <ChatList />
        <MessageFiled />
        </Typography>
     </Container>
    </div>
    )
};

export default Layout;