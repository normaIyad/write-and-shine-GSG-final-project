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
        

        <label
            htmlFor="formFile"
            className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
          >
          Default file input example
          </label>
          <input
            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
            type="file"
           id="formFile"
          />
          
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