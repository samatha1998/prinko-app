import React from "react";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import hero from "../assets/images/image4.jpg";

const Hero = () => {
  return (
    <Box
      sx={{
        height: "60vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Image with Zoom Animation */}
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      />

      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Dark overlay
        }}
      />

      {/* Hero Content */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
          zIndex: 2,
        }}
      >
        {/* Animated Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              textTransform: "uppercase",
              background: "linear-gradient(90deg, #4fb0da, #ffffff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "2px",
            }}
          >
            Welcome to Prinko
          </Typography>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
        >
          <Typography
            variant="h6"
            sx={{
              fontStyle: "italic",
              marginTop: "10px",
              opacity: 0.8,
            }}
          >
            Discover. Play. Enjoy.
          </Typography>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Hero;
