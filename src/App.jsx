// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Navbar from "./components/Navbar";

import Home from "./Pages/Home";
import Trending from "./Pages/Trending";
import Browse from "./Pages/Browse";
import Popular from "./Pages/Popular";
import TopRated from "./Pages/TopRated";
import Upcoming from "./Pages/Upcoming";
import NowPlaying from "./Pages/NowPlaying";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import MovieDetails from "./Pages/MovieDetails";
import SearchResults from "./Pages/SearchResults";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-950 text-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/browse-movies" element={<Browse />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/toprated" element={<TopRated />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/nowplaying" element={<NowPlaying />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/search" element={<SearchResults />} />
            <Route
              path="*"
              element={
                <div className="text-center mt-20 text-2xl">
                  404 - Page Not Found
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
