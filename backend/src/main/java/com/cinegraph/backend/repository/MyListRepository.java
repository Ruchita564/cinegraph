package com.cinegraph.backend.repository;

import com.cinegraph.backend.model.MyList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MyListRepository extends JpaRepository<MyList, Long> {

    List<MyList> findByUserId(Long userId);

    Optional<MyList> findByUserIdAndMovieId(Long userId, Long movieId);
}