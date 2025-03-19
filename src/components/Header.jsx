import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  TextField,
  InputAdornment,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion, useScroll, useSpring } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import MediaCard from "./MediaCard";
import { fetchMedias } from "../services/api";

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  const { scrollY } = useScroll();
  const ySpring = useSpring(scrollY, { stiffness: 100, damping: 20 });

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return ySpring.onChange((latest) => {
      setScrolled(latest > 100);
    });
  }, [ySpring]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredResults([]);
      setShowDropdown(false);
      return;
    }

    const fetchResults = async () => {
      try {
        const results = await fetchMedias(searchTerm);
        setFilteredResults(results);
        setShowDropdown(results.length > 0);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setFilteredResults([]);
      }
    };

    const debounceTimeout = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.div
      style={{
        position: "fixed",
        width: "100%",
        zIndex: 100,
        backgroundColor: scrolled ? "#4fb0da" : "transparent",
        boxShadow: scrolled ? "0px 4px 10px rgba(0,0,0,0.3)" : "none",
      }}
      animate={{
        y: scrolled ? -10 : 0,
        height: scrolled ? 100 : 80,
      }}
      transition={{ duration: 0.4, ease: "easeIn" }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          transition: "all 0.4s ease-in-out",
          padding: '10px',
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
          }}
        >
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: scrolled ? "1.2rem" : "1.5rem",
              transition: "all 0.3s ease-in-out",
              border: "2px dotted white",
              padding: "5px",
            }}
          >
            Prinko
          </Typography>

          {/* Search Input & Dropdown - Moved Closer to Upload */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2, // Adds space between search and upload button
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: scrolled ? "200px" : "250px",
                transition: "width 0.3s ease-in-out",
              }}
              ref={searchRef}
            >
              <TextField
                variant="outlined"
                placeholder="Search..."
                size="small"
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  width: "100%",
                  transition: "all 0.3s ease-in-out",
                  "&:focus-within": {
                    transform: "scale(1.05)",
                  },
                }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* Dropdown Results */}
              {showDropdown && (
                <Paper
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "90vw",
                    maxHeight: "300px",
                    overflowY: "auto",
                    backgroundColor: "#fff",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                    zIndex: 200,
                    padding: 2,
                    borderRadius: "8px",
                  }}
                >
                  <Grid container spacing={2}>
                    {filteredResults.map((media) => (
                      <Grid key={media.id} item xs={12} sm={4} md={3}>
                        <MediaCard media={media} />
                      </Grid>
                    ))}
                  </Grid>
                </Paper>
              )}
            </Box>

            {/* Upload Video Button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CloudUploadIcon />}
                sx={{
                  backgroundColor: "#fff",
                  color: "#4fb0da",
                  fontWeight: "bold",
                  borderRadius: "8px",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#e0f7fa",
                  },
                }}
                onClick={() => navigate("/admin/upload")}
              >
                Upload
              </Button>
            </motion.div>
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};

export default Header;
