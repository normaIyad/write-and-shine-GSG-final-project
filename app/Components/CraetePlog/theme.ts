import { createTheme, } from "@mui/material";
const position = {
  width: 1,
  position: "absolute",
  top: "40%",
  left: "50%",
  zIndex: "modal",
  transform: "translate(-50%, -50%)",
  display: "block",
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
const flex = {
  display: "flex",
  justifyContent: "space-between",
  gap: "10px",
}
const flexColom = {
  margin: "10px",
  display: "flex",
  gap: "2px",
  flexDirection: "column",
};
const supmitButton = {
  position: "absolute",  // Position the button absolutely within its container
  bottom: "20px",        // Add space from the bottom of the container
  right: "20px",
  margin: "10px",
  marginRight: "auto",
  borderRadius: "20px",
  height: "40px",
  fontWeight: "bold",
  padding: "10px 20px",
  zIndex: 15, // Ensures the button stays above other elements
  transition: "opacity 0.3s ease-in-out",
}
const textaria = {  
  backgroundColor: "white",
  borderRadius: "20px",
  padding: "12px",
  width: "100%",
  fontSize: "16px",
  fontFamily: "'Roboto', sans-serif",
  lineHeight: "1.5",
  border: "1px solid #ccc",
  transition: "height 0.3s ease-in-out, box-shadow 0.3s ease-in-out, border-color 0.3s",
  
  "&:hover": {
    borderColor: "#007bff",
  },

  "&:focus": {
    outline: "none",
    boxShadow: "0px 0px 12px rgba(0, 100, 255, 0.5)",
    borderColor: "#004ecb",
  },

  "&::placeholder": {
    color: "#999",
    fontSize: "14px",
    fontStyle: "italic",
  },

  "&:disabled": {
    backgroundColor: "#1976d2",
    color: "#999",
  },

  "@media (max-width: 768px)": {
    fontSize: "14px",
    padding: "10px",
  },
};
const textFieldStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "20px",
    backgroundColor: "white",
    padding: "5px",
    border: "1px solid #ccc",
    transition: "all 0.3s ease-in-out",

    "&:hover": {
      borderColor: "#007bff",
    },

    "&.Mui-focused": {
      boxShadow: "0px 0px 10px rgba(0, 100, 255, 0.4)",
      borderColor: "#004ecb",
    },
  },

  "& .MuiInputLabel-root": {
    color: "#666",
    fontSize: "14px",
    transition: "all 0.3s ease-in-out",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#004ecb",
  },

  "& .MuiOutlinedInput-input": {
    fontSize: "16px",
    padding: "12px",
  },

  "@media (max-width: 768px)": {
    "& .MuiOutlinedInput-input": {
      fontSize: "14px",
      padding: "10px",
    },
  },
};
const mainbox = {
  bgcolor: "primary.main",
  margin: "2px auto",
  maxWidth: 800,
  borderRadius: 20,
  padding: "20px",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  transition: "box-shadow 0.3s ease-in-out, background-color 0.3s",
  position: "relative",
}

export { position, theme, buttonsTheme, flex, flexColom, supmitButton , textaria , textFieldStyles , mainbox}   