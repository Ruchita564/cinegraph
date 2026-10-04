package com.cinegraph.backend.controller;

import com.cinegraph.backend.dto.LoginRequest;
import com.cinegraph.backend.dto.RegisterRequest;
import com.cinegraph.backend.model.User;
import com.cinegraph.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {
        "http://localhost:5173",
        "http://localhost:5174",
        "https://cinegraph-jvogghe10-ruchitasatpute570-2986.vercel.app",
        "https://cinegraph-lt45gxg1r-ruchitaspute570-2986.vercel.app"
})
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest request) {
        try {
            return userService.register(request);
        } catch (RuntimeException e) {
            if ("Email already registered".equals(e.getMessage())) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Email already registered"
                );
            }
            throw e;
        }
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
}