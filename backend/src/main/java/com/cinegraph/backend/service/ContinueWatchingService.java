package com.cinegraph.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cinegraph.backend.entity.ContinueWatching;
import com.cinegraph.backend.repository.ContinueWatchingRepository;

@Service
public class ContinueWatchingService {

    private final ContinueWatchingRepository repository;

    public ContinueWatchingService(
            ContinueWatchingRepository repository) {
        this.repository = repository;
    }

    public List<ContinueWatching> getByUser(Long userId) {
        return repository.findByUserId(userId);
    }

    public ContinueWatching saveProgress(
            Long userId,
            Long movieId,
            Integer progress) {

        ContinueWatching item =
                repository
                        .findByUserIdAndMovieId(userId, movieId)
                        .orElse(
                                new ContinueWatching(
                                        userId,
                                        movieId,
                                        progress
                                )
                        );

        item.setProgress(progress);

        return repository.save(item);
    }

    public void remove(
            Long userId,
            Long movieId) {

        repository.deleteByUserIdAndMovieId(
                userId,
                movieId
        );
    }
}