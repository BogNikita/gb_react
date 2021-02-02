import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

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

const Profile = ({name}) => {

    const classes = useStyles();

    return (
        <div style={{width: '60%', background: 'rgb(207, 232, 252)', minHeight: '90vh', display: 'flex', flexDirection: 'column'}}>
            <div style={{alignSelf: 'center'}}>
                <AccountCircleIcon style={{ fontSize: 240, color:'white' }} />
            </div>
            <div className={classes.root}>
                <TextField
                    id="filled-full-width"
                    label="First name"
                    style={{ margin: 20 }}
                    placeholder={`Bot #${name}`}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="filled"
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
}

export default Profile;