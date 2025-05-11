import React, { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { Grid, CircularProgress, Box, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { useTheme } from "@mui/material/styles"; // Import the useTheme hook

const API_KEY = "5c4aeb41cd07721a6fd30dc422ef4f3b";

function Dashboard() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [infiniteScrollEnabled, setInfiniteScrollEnabled] = useState(false);

  const observer = useRef();
  const navigate = useNavigate(); // Add navigate

  const theme = useTheme(); // Access the current theme

  const lastMovieElementRef = useCallback(
    (node) => {
      if (!infiniteScrollEnabled || loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, infiniteScrollEnabled]
  );

  useEffect(() => {
    fetchMovies(page);
    // eslint-disable-next-line
  }, [page]);

  const fetchMovies = async (pageToFetch) => {
    setLoading(true);
    try {
      const endpoint = isSearching ? "search/movie" : "movie/popular";
      const res = await axios.get(`https://api.themoviedb.org/3/${endpoint}`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          query: searchQuery,
          page: pageToFetch,
        },
      });

      if (res.data.results.length === 0) setHasMore(false);

      if (pageToFetch === 1) {
        setMovies(res.data.results);
      } else {
        setMovies((prev) => [...prev, ...res.data.results]);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    setHasMore(true);
    setInfiniteScrollEnabled(false);
    setIsSearching(searchQuery.trim() !== "");
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
    setInfiniteScrollEnabled(true);
  };

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <>
      <Header />
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
      />

      <Paper
        sx={{
          backgroundColor: theme.palette.background.default, // Adjust background color based on the theme
          minHeight: "100vh", // Make sure the background covers the full height of the page
          padding: theme.spacing(3),
        }}
      >
        <Grid
          container
          spacing={4}
          sx={{
            mx: { xs: 5, sm: 4, md: 18 },
            my: { xs: 3, sm: 5, md: 6 },
            px: { xs: 1, sm: 3, md: 4 },
            py: { xs: 2, sm: 4 },
          }}
        >
          {movies.map((movie, index) => {
            const isLast = index === movies.length - 1;
            return (
              <Grid
                item
                xs={12}
                sm={8}
                md={4}
                key={movie.id}
                ref={
                  isLast && infiniteScrollEnabled ? lastMovieElementRef : null
                }
                onClick={() => handleMovieClick(movie.id)}
                sx={{ cursor: "pointer" }}
              >
                <MovieCard movie={movie} />
              </Grid>
            );
          })}
        </Grid>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
            <CircularProgress />
          </Box>
        ) : (
          !infiniteScrollEnabled &&
          movies.length >= 15 && (
            <Box sx={{ textAlign: "center", my: 3 }}>
              <Button variant="contained" onClick={handleLoadMore}>
                Load More
              </Button>
            </Box>
          )
        )}
      </Paper>
    </>
  );
}

export default Dashboard;
