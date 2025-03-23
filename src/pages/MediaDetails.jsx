import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton"; // ✅ Import Skeleton
import CommentSection from "../components/CommentSection";
import Rating from "../components/Rating";
import { fetchMedia, submitComment } from "../services/api";
import banner from "../assets/images/image4.jpg";

const MediaDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [media, setMedia] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMedia = async () => {
      if (!id || typeof id !== "string") {
        setError("Invalid media ID");
        return;
      }

      try {
        setLoading(true);
        const fetchedMedia = await fetchMedia(String(id).trim());
        if (!fetchedMedia) {
          setError("Media not found");
          return;
        }

        setMedia(fetchedMedia);
        setComments(fetchedMedia.comments || []);
      } catch (error) {
        setError("Failed to load media");
      } finally {
        setLoading(false);
      }
    };

    loadMedia();
  }, [id]);

 const handleAddComment = async () => {
   if (!comment.trim()) return;

   const newComment = {
     uploadId: id,
     comment,
   };

     const username = localStorage.getItem("username") || "Guest"; 
   // Optimistic UI update (Ensure immediate state update)
   setComments((prevComments) => [
     ...prevComments,
     { username, text: comment, timestamp: new Date().toISOString() },
   ]);

   console.log("Updated Comments:", [...comments, { text: comment }]);

   setComment(""); // Clear input field after submission

   try {
     // Send to backend (with correct structure)
     await submitComment(newComment, location.pathname);
   } catch (error) {
     console.error("Error submitting comment:", error);

     // Rollback UI if API call fails
     setComments((prevComments) => prevComments.slice(0, -1));
   }
 };


  if (error) {
    return (
      <Typography
        variant="h6"
        color="error"
        sx={{ textAlign: "center", padding: "16px" }}
      >
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: "100%" }}>
      {/* Banner Image */}
      {loading ? (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={250}
          sx={{ borderRadius: "8px" }}
        />
      ) : (
        <Box
          component="img"
          src={media?.category === "images" ? media.url : banner}
          alt="Banner"
          sx={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
            borderRadius: "0px",
            marginBottom: "16px",
            boxShadow: 3,
          }}
        />
      )}

      <Box sx={{ padding: 6 }}>
        {/* Media Title */}
        {loading ? (
          <Skeleton variant="text" width="80%" height={40} />
        ) : (
          <Typography variant="h4" gutterBottom>
            {media?.title}
          </Typography>
        )}

        {/* Display Media */}
        {loading ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height={500}
            sx={{ borderRadius: "8px" }}
          />
        ) : media?.category === "videos" || media?.category === "movies" ? (
          <Box
            component="video"
            controls
            src={media?.url}
            sx={{
              width: "100%",
              maxHeight: "500px",
              borderRadius: "8px",
              boxShadow: 3,
              objectFit: "cover",
            }}
          />
        ) : (
          <Box
            component="img"
            src={media?.url}
            alt={media?.title}
            sx={{
              width: "100%",
              maxHeight: "500px",
              borderRadius: "8px",
              boxShadow: 3,
              objectFit: "cover",
            }}
          />
        )}

        {/* Rating */}
        {!loading && (
          <Rating mediaId={media?.id} initialRating={media?.rating} />
        )}

        {/* Comments Section */}
        <CommentSection comments={comments} />

        {/* Add Comment */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "8px",
            borderRadius: "8px",
          }}
        >
          <Avatar
            sx={{ backgroundColor: "var(--primary-color)", color: "#fff" }}
          >
            {media?.title?.charAt(0).toUpperCase()}
          </Avatar>
          <TextField
            label="Add a comment"
            variant="outlined"
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            sx={{
              marginLeft: "16px",
              backgroundColor: "#fff",
              borderRadius: "4px",
              input: { color: "#000" },
            }}
          />
          <Button
            variant="contained"
            sx={{
              marginLeft: "16px",
              backgroundColor: "var(--primary-color) !important",
              color: "#fff",
              "&:hover": { backgroundColor: "#cc0e1f" },
            }}
            onClick={handleAddComment}
            disabled={!comment.trim()}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MediaDetails;
