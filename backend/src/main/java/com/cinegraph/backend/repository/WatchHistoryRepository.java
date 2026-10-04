package com.cinegraph.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinegraph.backend.entity.WatchHistory;

public interface WatchHistoryRepository extends JpaRepository<WatchHistory, Long> {

    List<WatchHistory> findByUserIdOrderByWatchedAtDesc(Long userId);

    Optional<WatchHistory> findByUserIdAndMovieId(Long userId, Long movieId);
}