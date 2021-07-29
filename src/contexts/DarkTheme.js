import React from 'react';
import { createTheme, responsiveFontSizes } from '@material-ui/core';

let darkTheme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      dark: '#FD8E32',
      main: "#FD8E32",
      light: "#FD8E32"
    },
    // brownish
    secondary: {
      dark: '#00B589',
      main: '#00B589',
      light: '#00B589',
    },
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