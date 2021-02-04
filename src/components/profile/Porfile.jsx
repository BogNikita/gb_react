import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { changeTitle } from '../store/actions/chats';
import { connect } from 'react-redux';
import classes from './profile.module.css'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '20ch',
    },
  }));

const Profile = (props) => {
    const classesMaterial = useStyles();

    const changeTitleHandler = (e) => {
        const title = e.target.value;
        props.changeTitle(title, props.chatId)
    };

    return (
        <div className={classes.profile}>
            <div>
                <AccountCircleIcon style={{ fontSize: 240, color:'white' }} />
            </div>
            <div className={classesMaterial.root}>
                <TextField
                    id="filled-full-width"
                    label="First name"
                    style={{ margin: 20 }}
                    placeholder={props.state[props.chatId].title}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                    onChange={e => changeTitleHandler(e)}
                />
                <TextField
                    id="filled-full-width1"
                    label="Last name"
                    style={{ margin: 20 }}
                    placeholder="Placeholder"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                />
                <TextField
                    id="filled-full-width2"
                    label="Telephone"
                    style={{ margin: 20 }}
                    placeholder="Placeholder"
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
                />

                
            </div>
        </div>
    )
};

function mapStateToProps(state) {
    return {
        state: state.chatReducer.chats,
    };
};


function mapDispatchToProps(dispatch) {
    return {
        changeTitle: (title, chatId) => dispatch(changeTitle(title, chatId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);