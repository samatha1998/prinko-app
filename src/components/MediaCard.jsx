import React from "react";
import { Card, Typography, IconButton, Box } from "@mui/material";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import StarIcon from "@mui/icons-material/Star";
import Image1 from "../assets/images/gamepost__30_-1-300x420.jpg";
import Image2 from "../assets/images/video_img11-1-300x420.jpg";
import Image3 from "../assets/images/video_img6-1-300x420.jpg";
import { Link } from "react-router-dom";

// Default thumbnails for media types
const defaultThumbnails = {
  video: [Image1, Image2, Image3],
  movie: [Image1, Image2, Image3],
  image: [Image1, Image2, Image3],
};

// Function to get a random default thumbnail
const getRandomThumbnail = (type) => {
  const images = defaultThumbnails[type] || defaultThumbnails.image;
  return images[Math.floor(Math.random() * images.length)];
};

// Function to render star rating
const renderStars = (rating) => {
  return Array.from({ length: 5 }, (_, i) => (
    <StarIcon
      key={i}
      sx={{
        color: i < rating ? "#FFD700" : "#A9A9A9",
        fontSize: "20px",
      }}
    />
  ));
};

const MediaCard = ({ media }) => {
  const isVideoOrMovie =
    media.category === "videos" || media.category === "movies";
  const thumbnail = isVideoOrMovie
    ? getRandomThumbnail(media.category)
    : media.url || getRandomThumbnail(media.category || "image");

  return (
    <Card
      sx={{
        margin: "16px",
        position: "relative",
        borderRadius: 3,
        overflow: "hidden",
        height: 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${thumbnail})`,
        transition: "transform 0.3s ease-in-out",
        ":hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
        },
      }}
    >
      <Link
        to={`/media/${media.id}`}
        style={{ textDecoration: "none", height: "100%", display: "block" }}
      >
        {/* Category Label */}
        <Box
          sx={{
            position: "absolute", // Ensure it's positioned on top of the card
            top: 8, // Adjust distance from the top
            left: 8, // Adjust distance from the left
            backgroundColor: "var(--primary-color)",
            color: "white",
            px: 1.5,
            py: 0.5,
            borderRadius: 5,
          }}
        >
          <Typography variant="caption">
            {media.category || "Uncategorized"}
          </Typography>
        </Box>

        {/* Full-width Overlay */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 2,
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          {/* Media Title */}
          <Typography
            gutterBottom
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "white",
              fontSize: { xs: "4vw", sm: "3vw", md: "20px" }, // Responsive font size
              textAlign: "left",
              textTransform: "capitalize", // Ensures text is capitalized
              wordBreak: "break-word", // Prevents overflow issues
            }}
          >
            {media.title
              ? media.title
                  .toLowerCase()
                  .replace(/\b\w/g, (char) => char.toUpperCase()) // Capitalize each word
              : "Unknown Title"}
          </Typography>

          {/* Star Rating */}
          <Box sx={{ display: "flex", gap: 0.5, mb: 5 }}>
            {renderStars(media.averageRating || 0)}
          </Box>
        </Box>

        {/* Play button for videos and movies */}
        {isVideoOrMovie && (
          <IconButton
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              color: "white",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.4)",
                borderColor: "rgba(255, 255, 255, 0.6)",
              },
            }}
          >
            <PlayCircleOutlineIcon sx={{ fontSize: 60 }} />
          </IconButton>
        )}
      </Link>
    </Card>
  );
};

export default MediaCard;
