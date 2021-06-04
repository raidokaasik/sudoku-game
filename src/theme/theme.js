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
      main: "#e6922c",
      contrastText: "#fff",
    },
    secondary: {
      main: "#e6581c",
      contrastText: "#fff",
    },
  },
});

export default theme;
