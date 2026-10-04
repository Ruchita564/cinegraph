package com.cinegraph.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "continue_watching")
public class ContinueWatching {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long movieId;

    private Integer progress;

    public ContinueWatching() {
    }

    public ContinueWatching(Long userId, Long movieId, Integer progress) {
        this.userId = userId;
        this.movieId = movieId;
        this.progress = progress;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }

    public Integer getProgress() {
        return progress;
    }

    public void setProgress(Integer progress) {
        this.progress = progress;
    }
}