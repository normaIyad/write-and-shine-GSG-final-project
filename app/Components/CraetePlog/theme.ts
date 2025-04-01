import { createTheme, } from "@mui/material";
const position = {
    width: 1,
    position: "absolute",
    top: "40%",
    left: "50%",
    zIndex: "modal",
    transform: "translate(-50%, -50%)",
    display:"block",
    cursor: "pointer",
    outline: "none",
    border: "none",
  };
  const theme = createTheme({
    typography: {
      subtitle1: {
        fontSize: 12,
      },
      body1: {
        fontWeight: 500,
      },
      button: {
        fontStyle: "italic",
      },
    },
  });
  const buttonsTheme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "20px",
          },
        },
      },
    },
  });
  export { position , theme , buttonsTheme}