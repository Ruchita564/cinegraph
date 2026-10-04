package com.cinegraph.backend.service;

import com.cinegraph.backend.model.MyList;
import com.cinegraph.backend.repository.MyListRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyListService {

    private final MyListRepository myListRepository;

    public MyListService(MyListRepository myListRepository) {
        this.myListRepository = myListRepository;
    }

    public MyList addToMyList(Long userId, Long movieId) {

        if (myListRepository
                .findByUserIdAndMovieId(userId, movieId)
                .isPresent()) {

            return myListRepository
                    .findByUserIdAndMovieId(userId, movieId)
                    .get();
        }

        MyList myList = new MyList(userId, movieId);

        return myListRepository.save(myList);
    }

    public List<MyList> getMyList(Long userId) {
        return myListRepository.findByUserId(userId);
    }

    public void removeFromMyList(Long userId, Long movieId) {

        myListRepository
                .findByUserIdAndMovieId(userId, movieId)
                .ifPresent(myListRepository::delete);
    }
}