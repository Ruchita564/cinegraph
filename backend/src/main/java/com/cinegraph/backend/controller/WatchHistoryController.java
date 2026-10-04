package com.cinegraph.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cinegraph.backend.entity.WatchHistory;
import com.cinegraph.backend.service.WatchHistoryService;

@RestController
@RequestMapping("/api/watch-history")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class WatchHistoryController {

    private final WatchHistoryService watchHistoryService;

    public WatchHistoryController(WatchHistoryService watchHistoryService) {
        this.watchHistoryService = watchHistoryService;
    }

    @PostMapping
    public ResponseEntity<WatchHistory> saveWatchHistory(
            @RequestParam Long userId,
            @RequestParam Long movieId,
            @RequestParam String movieTitle,
            @RequestParam(required = false) String posterPath,
            @RequestParam(defaultValue = "1") Integer progress) {

        WatchHistory savedMovie =
                watchHistoryService.saveWatchHistory(
                        userId,
                        movieId,
                        movieTitle,
                        posterPath,
                        progress
                );

        return ResponseEntity.ok(savedMovie);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<WatchHistory>> getWatchHistory(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                watchHistoryService.getWatchHistory(userId)
        );
    }

    @GetMapping("/{userId}/continue")
    public ResponseEntity<List<WatchHistory>> getContinueWatching(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                watchHistoryService.getContinueWatching(userId)
        );
    }

    @DeleteMapping("/{userId}/{movieId}")
    public ResponseEntity<String> deleteWatchHistory(
            @PathVariable Long userId,
            @PathVariable Long movieId) {

        watchHistoryService.deleteWatchHistory(userId, movieId);

        return ResponseEntity.ok("Movie removed from watch history");
    }
}