import { createTheme } from '@mui/material';

interface PaletteColor { 
    light?: string;
    main: string;
    dark?: string;
    contrastText?: string;
  }
  

  export const theme = createTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: '#3D2B4C',
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      }
    }
  });