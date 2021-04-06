import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { addChat } from '../store/actions/chats';
import { connect } from 'react-redux';
import React from 'react';
import classes from './button.module.css';

const ButtonAddChat = (props) => {
    return (
        <div className={classes['button-add']}>
            <Fab color="inherit" aria-label="add" size="small" onClick={props.addChat}>
                <AddIcon />
            </Fab>
        </div>
    )
};

function mapDispatchToProps(dispatch) {
    return {
      addChat: () => dispatch(addChat()),
  };
};

export default connect(null, mapDispatchToProps)(ButtonAddChat);