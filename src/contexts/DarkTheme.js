import React from 'react';
import { createTheme, responsiveFontSizes } from '@material-ui/core';

let darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
  typography: { 
    fontFamily: 'Josefin Sans',
    fontWeightLight: 700,
    body1: {
      fontFamily: 'Roboto'
    }
  },
});

darkTheme = responsiveFontSizes(darkTheme)

export default darkTheme;