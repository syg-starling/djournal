import { createTheme } from '@mui/material/styles'

// Custom global variables
const global = {
  // Maximum content width when resolution is large
  maxContentWidth: 1280,
  menuWidth: '180px',
  responsiveMenuWidth: '128px',
  gradient: 'linear-gradient(to top right, #69FABD, #00AEE9)',
}

// Browser width breakpoints
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: global.maxContentWidth,
    xl: 1920,
  },
}


const color: any = {
  // harmony color
  biscay: '#1B295E',
  astronaut: '#2B396E',
  downriver: '#0B194E',

  electricBlue: '#00C0D8',
  lightBlue: '#E5F7FD',
  whiteBlue: '#F2FCFD',

  mintGreen: '#69FABD',
  aquamarine: '#79FFCD',
  shamrock: '#49DA9D',

  // arb colour
  rawSienna: '#CC7348',
  muleFawn: '#984D2F',
  justRight: '#EAD1B1',
  robRoy: '#E7C272',
  capePalliser: '#A17B46',
  sweetCorn: '#F7D282',
  tamarind: '#391E17',

  eastBay: '#48537E',

  red: '#E4627B',
  lightRed: '#FDEDE8',
  green: '#4CD964',
  transparent: 'rgba(0, 0, 0, 0)',
  gray: '#F2F8F9',
  opaque: 'rgba(255, 255, 255, 0.94)',
  white: '#fff',
  black: '#251500',
  specialGrey: '#AFC0D1',
  silver: '#DAE2EB',
  shipCove: '#6894c1',
  springGreen: '#00E9AA',
  shadow: 'rgba(175, 192, 209, 0.54)',
  orange: '#ED4716',

  metamask: '#EB8525',

  background: '#FAFAFA',
}

color.primary = color.electricBlue
color.primaryLight = color.astronaut
color.primaryDark = color.downriver
color.secondary = color.mintGreen
color.secondaryLight = color.aquamarine
color.secondaryDark = color.shamrock
color.error = color.red
color.textPrimary = color.biscay
color.textSecondary = color.eastBay

// Material UI default color palettes
const palette = {
  mode: 'light',
  primary: {
    main: color.primary,
  },
  secondary: {
    main: color.secondary,
  },
  error: {
    main: color.error,
  },
  text: {
    primary: color.textPrimary,
    secondary: color.textSecondary,
  },
  tertiary: {
    main: color.primaryDark,
  },
  metamask: {
    main: color.metamask,
    contrastText: color.white,
  },
  white: {
    main: color.white,
  },
  special: {
    main: color.electricBlue,
  },
  black: {
    main: color.black,
  },
  warning: {
    main: '#F9CA55',
  },
  twitter: {
    main: '#55ACEE',
  },
  silver: {
    main: color.silver,
  },
}

// eslint-disable-next-line quotes
const fontBody = `'Nunito', sans-serif`
// eslint-disable-next-line quotes
const fontHeader = `'Nunito', sans-serif`

// Material UI default font typography
const typography = {
  fontFamily: fontBody,
  htmlFontSize: 16,
  fontSize: 16,
  color: 'textPrimary',
  h1: {
    fontFamily: fontHeader,
    fontSize: '2.125rem',
    fontWeight: 600,
  },
  h2: {
    fontFamily: fontHeader,
    fontSize: '1.5rem',
    fontWeight: 600,
  },
  h3: {
    fontFamily: fontHeader,
    fontSize: '1.25rem',
    fontWeight: 600,
  },
  h4: {
    fontFamily: fontHeader,
    fontSize: '1rem',
    fontWeight: 600,
  },
  h5: {
    fontFamily: fontHeader,
    fontSize: '0.875rem',
    fontWeight: 600,
  },
  h6: {
    fontFamily: fontHeader,
    fontSize: '0.75rem',
    fontWeight: 600,
  },
  body1: {
    fontWeight: 400,
    whiteSpace: 'pre-wrap',
  },
  body2: {
    fontWeight: 400,
    whiteSpace: 'pre-wrap',
  },
  subtitle1: {
    fontWeight: 300,
  },
  subtitle2: {
    fontWeight: 300,
  },
  caption: {
    fontWeight: 400,
  },
}

// Material UI component overrides
// https://next.material-ui.com/customization/theme-components/
const components = {
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: color.white,
      },
    },
  },
  MuiButtonBase: {
    defaultProps: {
      disableRipple: false, // Set to true for no more ripple, on the whole application 💣!
    },
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: '10px',
      },
    },
  },
  MuiListItemText: {
    styleOverrides: {
      inset: {
        marginLeft: 'unset',
        paddingLeft: 15,
      },
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: '10px',
      },
      containedPrimary: {
        color: color.white,
      },
      containedSecondary: {
        color: color.white,
      },
      textPrimary: {
        textTransform: 'none',
        fontWeight: 600,
      },
      containedSpecial: {
        color: color.white,
        background: `linear-gradient(to top right, ${color.mintGreen}, ${color.electricBlue})`,
      },
      outlinedSpecial: {
        borderWidth: '3px',
        color: color.downriver,
        background: color.white,
        fontWeight: 400,
      },
      containedTwitter: {
        color: color.white,
      },
    },
  },
  MuiInput: {
    defaultProps: {
      autoComplete: 'off',
    },
  },
  MuiCheckbox: {
    defaultProps: {
      color: 'primary',
    },
  },
  MuiPaper: {
    defaultProps: {
      elevation: 0,
      square: true,
      border: '1px solid rgba(0, 0, 0, 0.12)',
    },
    styleOverrides: {
      root: {
        border: '1px solid rgba(0, 0, 0, 0.12)',
      },
    },
  },
  MuiRadio: {
    defaultProps: {
      color: 'primary',
    },
  },
  MuiSwitch: {
    defaultProps: {
      color: 'primary',
    },
  },
  MuiTextField: {
    defaultProps: {
      size: 'small',
    },
  },
  MuiLink: {
    defaultProps: {
      color: 'primary',
      underline: 'none',
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: {
        marginLeft: 0,
      },
    },
  },
  MuiTypography: {
    defaultProps: {
      variantMapping: {
        body1: 'span',
        body2: 'span',
      },
    },
    styleOverrides: {
      root: {
        wordWrap: 'break-word',
      },
    },
  },
}

const muiTheme = {
  global,
  breakpoints,
  color,
  palette,
  typography,
  components,
}

// eslint-disable-next-line
export default createTheme(muiTheme)
