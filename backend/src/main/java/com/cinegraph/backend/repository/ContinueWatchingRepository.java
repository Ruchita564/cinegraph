package com.cinegraph.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cinegraph.backend.entity.ContinueWatching;

public interface ContinueWatchingRepository
        extends JpaRepository<ContinueWatching, Long> {

    List<ContinueWatching> findByUserId(Long userId);

    Optional<ContinueWatching> findByUserIdAndMovieId(
            Long userId,
            Long movieId
    );

    void deleteByUserIdAndMovieId(
            Long userId,
            Long movieId
    );
}