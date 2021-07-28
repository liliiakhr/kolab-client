import React from 'react';
import { createTheme } from '@material-ui/core';

const defaultTheme = createTheme({
    // You get the objects from the documentation
    palette: {
      // ~turquoise
        primary: {
            dark: '#006C7A',
            main: '#55ABB1',
            light: '#E0F7FA',
        },
        // brownish
        secondary: {
          dark: '#543327',
          main: "#6D4031",
          light: "F2E7E3"
        },
    }
})


export default defaultTheme;