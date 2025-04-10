import { useUserStore } from "@/app/store/useUserStore";
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
const EditProfileForm = () => {
  const router = useRouter();
  const { userData } = useUserStore();
  const [name, setName] = useState("");
  const [jobtitle, setJobTitle] = useState("");
  const [education, setEducation] = useState("");
  const [biography, setBiography] = useState("");
  const [img, setImg] = useState<File | null>(null);
  const [loader, setLoader] = useState(false);

  const validateForm = () => {
    if (!name || name.length < 5) return "Name must be at least 5 characters.";
    if (!jobtitle || jobtitle.length < 3)
      return "Job title must be at least 3 characters.";
    if (!education || education.length < 5)
      return "Education must be at least 5 characters.";
    if (!biography || biography.length < 10)
      return "Biography must be at least 10 characters.";
    return null;
  };

  const getImg = async () => {
    if (!img) return null;
    if (img && userData?.userId) {
      const formData = new FormData();
      formData.append("file", img);
      formData.append("user_id", userData.userId);

      try {
        const response = await fetch("/api/user/upload-photo", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (data?.imageUrl) {
          return data.imageUrl;
        } else {
          console.error("Image upload failed:", data?.error);
          return null;
        }
      } catch (err) {
        console.error("Error during image upload:", err);
        return null;
      }
    }
    return null;
  };

  const editData = async () => {
    try {
      const imageUrl = await getImg(userData.userId);
      const newData = {
        id: userData?.userId,
        job_title: jobtitle,
        education,
        biography,
        username: name,
        ...(imageUrl && { image: imageUrl }),
      };

      const response = await fetch(`/api/user/${userData?.userId}/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Profile updated successfully.");
      } else {
        console.error("Profile update failed:", result?.error);
        alert("Failed to update profile.");
      }
    } catch (err) {
      console.error("Error during profile update:", err);
      alert("An error occurred while updating your profile.");
    } finally {
      setLoader(false);
    }
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImg(file);
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }
    setLoader(true);
    await editData(); // wait for it to finish before navigating
    setName("");
    setJobTitle("");
    setEducation("");
    setBiography("");
    setImg(null);
    setTimeout(() => {
      router.push(`/profile/${userData?.userId}`);
    }, 300);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: 2,
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "60%",
          padding: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="#1976d2" gutterBottom>
          Edit Profile
        </Typography>

        <Button variant="outlined" component="label">
          Upload Profile Picture
          <input
            hidden
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Button>
        <Typography variant="body2">{img?.name}</Typography>

        <Box display="flex" flexDirection="column" gap={2} marginTop={2}>
          <TextField
            label="Full Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Job Title"
            variant="outlined"
            value={jobtitle}
            onChange={(e) => setJobTitle(e.target.value)}
            fullWidth
          />
          <TextField
            label="Education"
            variant="outlined"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
            fullWidth
          />
          <TextField
            label="Biography"
            variant="outlined"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            fullWidth
            multiline
            rows={4}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={handleSubmit}
            disabled={loader}
          >
            {loader ? <CircularProgress size={24} /> : "Save Changes"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditProfileForm;
