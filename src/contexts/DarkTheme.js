import React from 'react';
import { createTheme, responsiveFontSizes } from '@material-ui/core';

let darkTheme = createTheme({
  palette: {
    type: 'dark',
  },
});

darkTheme = responsiveFontSizes(darkTheme)

export default darkTheme;