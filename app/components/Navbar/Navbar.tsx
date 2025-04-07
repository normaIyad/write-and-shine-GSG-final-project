"use client";
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Link from "next/link";
import { Button } from "@mui/material";
import Image from "next/image";
import logo from "@/app/Images/logo1.png";
const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#3674B5" }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link href="/">
            <Image src={logo} alt="Logo" width={100} height={40} />
          </Link>
        </Box>
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
          <Button color="inherit">
            <Link href="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              href="/Signin"
              style={{ textDecoration: "none", color: "white" }}
            >
              Sign In
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              href="/about"
              style={{ textDecoration: "none", color: "white" }}
            >
              About Us
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              href="/contactus"
              style={{ textDecoration: "none", color: "white" }}
            >
              Contact Us
            </Link>
          </Button>
        </Box>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenuOpen}
          color="inherit"
        >
          <Avatar alt="User Avatar" src="/profile.jpg" />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <Link href={"/PersonalDetails"}>Profile</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;