import React from 'react';
import PushToggle from '../PushToggle/index.jsx';
import classes from './header.module.css'

const Header = ({name, navigate}) => {

    return(
        <>
        <PushToggle/>
        <h1 className={classes.header} onClick={navigate}>{name}</h1>
        </>
    )
}

export default Header;