import React from 'react';

const Header = ({name, navigate}) => {

    return(
        <h1 className='header' onClick={navigate} style={{textAlign: 'center', width: '100%', margin: 0, paddingTop: 10, cursor: 'pointer'}}>{name}</h1>
    )
}

export default Header;