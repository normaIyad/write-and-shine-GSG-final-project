"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
  Paper,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(formData.message + `\n\nFrom: ${formData.email}`);
  
    window.location.href = `mailto:writeAndShine@gmail.com?subject=${subject}&body=${body}`;
  };
  

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Us
      </Typography>
      <Typography variant="subtitle1" align="center" gutterBottom>
        We'd love to hear from you — whether you have a question or just want to
        say hi!
      </Typography>

      <Grid container spacing={4} mt={4}>
        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Your Name"
                name="name"
                fullWidth
                margin="normal"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextField
                label="Your Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <TextField
                label="Your Message"
                name="message"
                multiline
                rows={5}
                fullWidth
                margin="normal"
                value={formData.message}
                onChange={handleChange}
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Send Message
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* Contact Info + Map */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <PhoneIcon color="primary" sx={{ mr: 1 }} />
              <Typography>+970 598980999</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={2}>
              <EmailIcon color="primary" sx={{ mr: 1 }} />
              <Typography>writeAndShine@gmail.com</Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <LocationOnIcon color="primary" sx={{ mr: 1 }} />
              <Typography>Palestine</Typography>
            </Box>
          </Paper>

          <Box overflow="hidden" borderRadius={2} boxShadow={3}>
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3469796.7008324226!2d34.00003230896429!3d31.94716273724759!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151cbe6e3d1b9a61%3A0x99a237165c1703de!2sPalestine!5e0!3m2!1sen!2sus!4v1712345678901!5m2!1sen!2sus"
    width="100%"
    height="250"
    loading="lazy"
    style={{ border: 0 }}
    allowFullScreen
  ></iframe>
</Box>

        </Grid>
      </Grid>
    </Container>
  );
}
