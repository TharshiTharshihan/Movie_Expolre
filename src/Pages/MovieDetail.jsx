import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Rating,
  Button,
  CircularProgress,
  useTheme,
  Paper,
} from "@mui/material";
import Header from "../components/Header";
const API_KEY = "5c4aeb41cd07721a6fd30dc422ef4f3b";

function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const theme = useTheme(); // Access the current theme

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
        );
        const data = await res.json();
        setMovie(data);

        const trailer = data.videos?.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );
        if (trailer) setTrailerKey(trailer.key);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          backgroundColor: theme.palette.background.default, // Set background color for the container
          color: theme.palette.text.primary, // Set text color to ensure contrast in dark mode
          padding: theme.spacing(2),
          borderRadius: "10px",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{
            mb: 2,
            color: theme.palette.text.primary,
            borderColor: theme.palette.text.primary,
            "&:hover": {
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.action.main,
            },
          }}
        >
          Back
        </Button>

        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: theme.palette.text.primary }}
        >
          {movie.title}
        </Typography>

        <Paper
          elevation={3}
          sx={{
            p: 2,
            backgroundColor: theme.palette.background.paper, // Set background color for Paper in dark mode
          }}
        >
          <Box display="flex" gap={4} flexWrap="wrap">
            <Box>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Image"
                }
                alt={movie.title}
                style={{
                  width: "250px",
                  borderRadius: "10px",
                  boxShadow:
                    theme.palette.mode === "dark"
                      ? "0 0 10px #000"
                      : "0 0 5px #ccc",
                }}
              />
            </Box>

            <Box flex="1">
              <Typography
                variant="body1"
                paragraph
                sx={{ color: theme.palette.text.primary }}
              >
                {movie.overview}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: theme.palette.text.primary }}
              >
                <strong>Release Year:</strong>{" "}
                {new Date(movie.release_date).getFullYear()}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: theme.palette.text.primary }}
              >
                <strong>Genres:</strong>{" "}
                {movie.genres.map((genre) => genre.name).join(", ")}
              </Typography>
              <Box mt={2}>
                <Rating
                  value={movie.vote_average / 2}
                  precision={0.5}
                  readOnly
                />
                <Typography variant="body2" color="text.secondary">
                  {movie.vote_average.toFixed(1)}/10 ({movie.vote_count} votes)
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>

        {trailerKey && (
          <Box mt={4} mb={4}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: theme.palette.text.primary }}
            >
              Watch Trailer
            </Typography>
            <Box
              sx={{
                position: "relative",
                paddingBottom: "56.25%", // 16:9 ratio
                height: 0,
                overflow: "hidden",
                borderRadius: "10px",
              }}
            >
              <Box
                component="iframe"
                src={`https://www.youtube.com/embed/${trailerKey}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
}

export default MovieDetail;
