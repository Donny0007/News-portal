import React, { useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import LandingPage from "./components/LandingPage";
import ArticlePage from "./components/ArticlePage";
import SearchResults from "./components/SearchResults";
import NotFound from "./components/NotFound";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          searchTerm
        )}&apiKey=c7f73cd0b5b042b391c5e44b021623ff`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      setSearchResults(data.articles);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setIsLoading(false);
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Router>
      <AppContainer>
        <h1>News Search</h1>
        <form onSubmit={handleSearch}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="searchTerm"
            label="Search"
            name="searchTerm"
            autoComplete="off"
            value={searchTerm}
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <Button
                  type="submit"
                  color="primary"
                  disabled={searchTerm.trim() === ""}
                >
                  {isLoading ? <CircularProgress size={24} /> : <SearchIcon />}
                </Button>
              ),
            }}
          />
        </form>
        {errorMessage && <p>{errorMessage}</p>}
        <Routes>
          <Route
            path="/"
            element={<LandingPage onSearch={handleSearch} />}
          />
          <Route
            path="/search"
            element={<SearchResults results={searchResults} />}
          />
          <Route path="/article/:url" element={<ArticlePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
