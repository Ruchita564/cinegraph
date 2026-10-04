package com.cinegraph.backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cinegraph.backend.service.TMDBService;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class TMDBController {

    private final TMDBService tmdbService;

    public TMDBController(TMDBService tmdbService) {
        this.tmdbService = tmdbService;
    }

    @GetMapping("/popular")
    public String getPopularMovies() {
        return tmdbService.getPopularMovies();
    }

    @GetMapping("/trending")
    public String getTrendingMovies() {
        return tmdbService.getTrendingMovies();
    }

    @GetMapping("/top-rated")
    public String getTopRatedMovies() {
        return tmdbService.getTopRatedMovies();
    }

    @GetMapping("/now-playing")
    public String getNowPlayingMovies() {
        return tmdbService.getNowPlayingMovies();
    }

    @GetMapping("/search")
    public String searchMovies(@RequestParam String query) {
        return tmdbService.searchMovies(query);
    }

    @GetMapping("/{movieId}")
    public String getMovieDetails(@PathVariable Long movieId) {
        return tmdbService.getMovieDetails(movieId);
    }

    @GetMapping("/{movieId}/videos")
    public String getMovieVideos(@PathVariable Long movieId) {
        return tmdbService.getMovieVideos(movieId);
    }
}