package com.cinegraph.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cinegraph.backend.entity.User;
import com.cinegraph.backend.entity.WatchHistory;
import com.cinegraph.backend.repository.UserRepository;
import com.cinegraph.backend.repository.WatchHistoryRepository;

@Service
public class WatchHistoryService {

    private final WatchHistoryRepository watchHistoryRepository;
    private final UserRepository userRepository;

    public WatchHistoryService(
            WatchHistoryRepository watchHistoryRepository,
            UserRepository userRepository) {

        this.watchHistoryRepository = watchHistoryRepository;
        this.userRepository = userRepository;
    }

    // Save or update a watched movie
    public WatchHistory saveWatchHistory(
            Long userId,
            Long movieId,
            String movieTitle,
            String posterPath,
            Integer progress) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        WatchHistory watchHistory =
                watchHistoryRepository
                        .findByUserIdAndMovieId(userId, movieId)
                        .orElse(new WatchHistory());

        watchHistory.setUser(user);
        watchHistory.setMovieId(movieId);
        watchHistory.setMovieTitle(movieTitle);
        watchHistory.setPosterPath(posterPath);
        watchHistory.setProgress(progress);
        watchHistory.setWatchedAt(LocalDateTime.now());

        return watchHistoryRepository.save(watchHistory);
    }

    // Get complete watch history
    public List<WatchHistory> getWatchHistory(Long userId) {
        return watchHistoryRepository
                .findByUserIdOrderByWatchedAtDesc(userId);
    }

    // Get Continue Watching movies
    public List<WatchHistory> getContinueWatching(Long userId) {

        return watchHistoryRepository
                .findByUserIdOrderByWatchedAtDesc(userId)
                .stream()
                .filter(movie ->
                        movie.getProgress() != null &&
                        movie.getProgress() > 0 &&
                        movie.getProgress() < 100
                )
                .toList();
    }

    // Delete one movie from watch history
    public void deleteWatchHistory(Long userId, Long movieId) {

        WatchHistory watchHistory =
                watchHistoryRepository
                        .findByUserIdAndMovieId(userId, movieId)
                        .orElseThrow(() ->
                                new RuntimeException("Watch history not found"));

        watchHistoryRepository.delete(watchHistory);
    }
}