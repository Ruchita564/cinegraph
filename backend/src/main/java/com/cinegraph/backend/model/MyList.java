package com.cinegraph.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "my_list")
public class MyList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private Long movieId;

    public MyList() {
    }

    public MyList(Long userId, Long movieId) {
        this.userId = userId;
        this.movieId = movieId;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getMovieId() {
        return movieId;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setMovieId(Long movieId) {
        this.movieId = movieId;
    }
}