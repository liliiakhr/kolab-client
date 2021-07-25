import React, {useState, useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function FlashMessage ({trigger, children, messageType}) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(true);
  }, [trigger])
    
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

 return (
    <div className={classes.root}>
        { 
          (children !== null) &&
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
              <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={messageType}> 
                {
                  children
                }
              </MuiAlert>
          </Snackbar>
        }
    </div>
    );
}

export default FlashMessage