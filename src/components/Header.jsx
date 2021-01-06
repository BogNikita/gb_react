import React from 'react';

const Header = ({name}) => {

    return(
        <h1  className='header' style={{textAlign: 'center', width: '100%', margin: 0, paddingTop: 10}}>Bot #{name}</h1>
    )
}

export default Header;