import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      mobileS: 320,
      mobileM: 375,
      mobileL: 425,
      tablet: 768,
      laptopL: 1440,
    },
  },
  palette: {
    primary: {
      main: "#5277bf",
      contrastText: "#fff",
    },
    secondary: {
      main: "#d66b6b",
      contrastText: "#fff",
    },
  },
});

export default theme;
