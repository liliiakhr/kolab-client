import React from 'react';
import { createTheme, responsiveFontSizes } from '@material-ui/core';

let defaultTheme = createTheme({
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
      },
    typography: {
        fontFamily: 'Josefin Sans',
        // fontWeight: 700,
        // fontWeightLight: 700, 
        // fontWeightRegular: 700, 
        // fontWeightMedium: 700,
        // fontWeightBold: 700,
        body2: {
          fontWeight: 700
        },
        body1: {
          // fontFamily: 'Roboto'
        }
    },
})

defaultTheme = responsiveFontSizes(defaultTheme)

export default defaultTheme;