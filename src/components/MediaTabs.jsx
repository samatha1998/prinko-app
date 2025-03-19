import React, { useState } from "react";
import { Tabs, Tab, Box, Pagination, Typography, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import MediaCard from "./MediaCard";

const MediaTabs = ({ mediaData, loading }) => {
  const [tab, setTab] = useState("all");
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  // Filter media based on selected tab
  const filteredMedia =
    tab === "all"
      ? mediaData
      : mediaData.filter((media) => media.category === tab);

  // Paginate media
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedMedia = filteredMedia.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box sx={{ width: "100%", textAlign: "center", marginTop: 4 }}>
      {/* Tabs with Custom Styling */}
      
      <Tabs
        value={tab}
        onChange={(e, newValue) => {
          setTab(newValue);
          setPage(1);
        }}
        centered
        sx={{
          backgroundColor: "#f0f0f0",
          borderRadius: "8px",
          display: "inline-block",
          padding: "4px",
          "& .MuiTabs-indicator": { display: "none" },
        }}
      >
        <Tab
          label="all"
          value="all"
          sx={{
            padding: "10px 20px",
            borderRadius: "6px",
            transition: "0.3s",
            fontWeight: "bold",
            "&.Mui-selected": {
              backgroundColor: "#4fb0da",
              color: "#fff",
            },
            "&:hover": {
              backgroundColor: "#4fb0da22",
            },
          }}
        />
        <Tab
          label="videos"
          value="videos"
          sx={{
            padding: "10px 20px",
            borderRadius: "6px",
            transition: "0.3s",
            fontWeight: "bold",
            "&.Mui-selected": {
              backgroundColor: "#4fb0da",
              color: "#fff",
            },
            "&:hover": {
              backgroundColor: "#4fb0da22",
            },
          }}
        />
        <Tab
          label="images"
          value="images"
          sx={{
            padding: "10px 20px",
            borderRadius: "6px",
            transition: "0.3s",
            fontWeight: "bold",
            "&.Mui-selected": {
              backgroundColor: "#4fb0da",
              color: "#fff",
            },
            "&:hover": {
              backgroundColor: "#4fb0da22",
            },
          }}
        />
      </Tabs>

      {/* Show Skeleton Loader when Loading */}
      {loading ? (
        <Grid
          container
          spacing={2}
          justifyContent="center"
          sx={{ marginTop: 2 }}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid key={index} size={{ xs: 12, sm: 3, md: 3 }}>
              <Box sx={{ width: "100%", padding: 2 }}>
                <Skeleton variant="rectangular" width="100%" height={180} />
                <Skeleton variant="text" width="80%" sx={{ mt: 1 }} />
                <Skeleton variant="text" width="60%" />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : filteredMedia.length === 0 ? (
        <Typography variant="h6" sx={{ marginTop: 3, color: "gray" }}>
          No media available
        </Typography>
      ) : (
        <>
          {/* Media Grid */}
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ marginTop: 2 }}
          >
            {paginatedMedia.map((media) => (
              <Grid key={media.id} size={{ xs: 12, sm: 3, md: 3 }}>
                <MediaCard media={media} />
              </Grid>
            ))}
          </Grid>

          {/* Pagination - Hidden if No Media */}
          {filteredMedia.length > itemsPerPage && (
            <Pagination
              count={Math.ceil(filteredMedia.length / itemsPerPage)}
              page={page}
              onChange={(e, value) => setPage(value)}
              sx={{
                marginTop: 3,
                display: "flex",
                justifyContent: "center",
                "& .MuiPaginationItem-root": {
                  color: "var(--secondary-color)",
                },
                "& .Mui-selected": {
                  backgroundColor: "var(--primary-color) !important",
                  color: "white",
                },
                "& .MuiPaginationItem-root:hover": {
                  backgroundColor: "var(--primary-color-light)",
                },
              }}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default MediaTabs;
