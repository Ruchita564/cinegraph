package com.cinegraph.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cinegraph.backend.entity.ContinueWatching;
import com.cinegraph.backend.service.ContinueWatchingService;

@RestController
@RequestMapping("/api/continue-watching")
@CrossOrigin(origins = "http://localhost:5173")
public class ContinueWatchingController {

    private final ContinueWatchingService service;

    public ContinueWatchingController(
            ContinueWatchingService service) {
        this.service = service;
    }

    @GetMapping("/{userId}")
    public List<ContinueWatching> getContinueWatching(
            @PathVariable Long userId) {

        return service.getByUser(userId);
    }

    @PostMapping
    public ContinueWatching saveProgress(
            @RequestParam Long userId,
            @RequestParam Long movieId,
            @RequestParam Integer progress) {

        return service.saveProgress(
                userId,
                movieId,
                progress
        );
    }

    @DeleteMapping
    public void remove(
            @RequestParam Long userId,
            @RequestParam Long movieId) {

        service.remove(userId, movieId);
    }
}