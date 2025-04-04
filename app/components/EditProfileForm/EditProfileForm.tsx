import { Box,Typography,Button,TextField } from "@mui/material";
const EditProfileForm = () => (
    <Box
      sx={{
        display: "flex",
        justifyContent:"center",
        padding:2,
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width:"60%",
          height:"60%",
          padding: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="#1976d2" gutterBottom>
          Edit Profile
        </Typography>
        <Box display="flex" flexDirection="column" gap={2} marginTop={2}>
          <TextField label="Full Name" defaultValue="Husni Ishtayeh" variant="outlined" fullWidth />
          <TextField label="Job Title" defaultValue="Software Engineer" variant="outlined" fullWidth />
          <TextField label="Education" defaultValue="Bachelor of Computer Engineering" variant="outlined" fullWidth />
          <TextField
            label="Biography"
            defaultValue="Passionate about creating user-friendly and visually appealing web interfaces with modern technologies."
            variant="outlined"
            fullWidth
            multiline
            rows={4}
          />
          <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Save Changes
          </Button>
        </Box>
      </Box>
    </Box>
  );
  export default EditProfileForm;