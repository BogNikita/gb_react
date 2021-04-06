import React, { useEffect, useState } from "react";
import CloseIcon from '@material-ui/icons/Close';
import classes from './installPopup.module.css';

const InstallPopup = () => {
    const state = {
        isShown: false
    };

    const [newState, setState] = useState(state);

    const handleShow = () => {
        setState(() => ({isShown: true}));
    };

    const handleHide = () => {
        setState(() => ({isShown: false}));
    };

    useEffect(() => {
        const isIos = () => {
            const userAgent = window.navigator.userAgent.toLowerCase();
            return /iphone/.test(userAgent)
        }

        const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

        if (isIos() && !isInStandaloneMode()) {
            handleShow();
        };
    }, []);

    return (
        <div style={ { display: newState.isShown ? 'block' : 'none' } } className={classes["speech-bubble-container"]}>
               <div className={classes["speech-bubble"]}>
                   <CloseIcon className={classes["close-install-message-icon"]} onClick={ handleHide } />
                   <div style={ { paddingRight: '15px' } }>Установи приложение на свой iPhone: нажми «Поделиться», а затем на экран «Домой»</div>
               </div>
           </div>
       );
};

export default InstallPopup;
