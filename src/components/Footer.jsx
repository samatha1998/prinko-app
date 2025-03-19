import React from "react";
import {
  Box,
  Typography,
  Link,
  Container,
  Divider,
  IconButton,
} from "@mui/material";
import { Facebook, Twitter, Instagram, YouTube } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#072735",
        color: "#ccc",
        padding: "30px 0",
        marginTop: "40px",
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          {/* Brand Info */}
          <Typography
            variant="body1"
            sx={{ fontSize: "1.1rem", fontWeight: "bold" }}
          >
            &copy; {new Date().getFullYear()} Play CO. All rights reserved.
          </Typography>

          {/* Social Media Icons */}
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              marginTop: { xs: "12px", sm: "0" },
            }}
          >
            <IconButton
              href="https://facebook.com"
              target="_blank"
              sx={{ color: "#ccc" }}
            >
              <Facebook />
            </IconButton>
            <IconButton
              href="https://twitter.com"
              target="_blank"
              sx={{ color: "#ccc" }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              sx={{ color: "#ccc" }}
            >
              <Instagram />
            </IconButton>
            <IconButton
              href="https://youtube.com"
              target="_blank"
              sx={{ color: "#ccc" }}
            >
              <YouTube />
            </IconButton>
          </Box>
        </Box>

        {/* Divider */}
        <Divider sx={{ backgroundColor: "#444", margin: "20px 0" }} />

        {/* Additional Links */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            textAlign: "center",
            gap: "15px",
          }}
        >
          <Link
            href="/about"
            color="inherit"
            sx={{ textDecoration: "none", "&:hover": { color: "#fff" } }}
          >
            About Us
          </Link>
          <Link
            href="/privacy"
            color="inherit"
            sx={{ textDecoration: "none", "&:hover": { color: "#fff" } }}
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            color="inherit"
            sx={{ textDecoration: "none", "&:hover": { color: "#fff" } }}
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            color="inherit"
            sx={{ textDecoration: "none", "&:hover": { color: "#fff" } }}
          >
            Contact Us
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
