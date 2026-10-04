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

import com.cinegraph.backend.model.MyList;
import com.cinegraph.backend.service.MyListService;

@RestController
@RequestMapping("/api/my-list")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
public class MyListController {

    private final MyListService myListService;

    public MyListController(MyListService myListService) {
        this.myListService = myListService;
    }

    @PostMapping
    public MyList addToMyList(
            @RequestParam Long userId,
            @RequestParam Long movieId) {

        return myListService.addToMyList(userId, movieId);
    }

    @GetMapping("/{userId}")
    public List<MyList> getMyList(@PathVariable Long userId) {
        return myListService.getMyList(userId);
    }

    @DeleteMapping
    public void removeFromMyList(
            @RequestParam Long userId,
            @RequestParam Long movieId) {

        myListService.removeFromMyList(userId, movieId);
    }
}