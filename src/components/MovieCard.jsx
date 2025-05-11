import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Rating,
} from "@mui/material";

function MovieCard({ movie }) {
  return (
    <Box display="flex" justifyContent="center" width="100%">
      <Card sx={{ maxWidth: 345, width: "100%" }}>
        <CardMedia
          sx={{ height: 200 }}
          image={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          title={movie.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" noWrap>
            {movie.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.overview.length > 100
              ? movie.overview.slice(0, 100) + "..."
              : movie.overview}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            flexDirection: "column",
            alignItems: "flex-start",
            px: 2,
            pb: 2,
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Rating value={movie.vote_average / 2} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary">
              {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary" mt={1}>
            {new Date(movie.release_date).getFullYear()}
          </Typography>
        </CardActions>
      </Card>
    </Box>
  );
}

export default MovieCard;
