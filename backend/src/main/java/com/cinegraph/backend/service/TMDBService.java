package com.cinegraph.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TMDBService {

    @Value("${tmdb.access-token}")
    private String accessToken;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getPopularMovies() {

        String url =
                "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> response =
                restTemplate.exchange(
                        url,
                        HttpMethod.GET,
                        entity,
                        String.class
                );

        return response.getBody();
    }
    public String getTrendingMovies() {

    String url =
            "https://api.themoviedb.org/3/trending/movie/week?language=en-US";

    HttpHeaders headers = new HttpHeaders();
    headers.setBearerAuth(accessToken);

    HttpEntity<String> entity = new HttpEntity<>(headers);

    ResponseEntity<String> response =
            restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

    return response.getBody();
}
public String getTopRatedMovies() {

    String url =
            "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

    HttpHeaders headers = new HttpHeaders();
    headers.setBearerAuth(accessToken);

    HttpEntity<String> entity = new HttpEntity<>(headers);

    ResponseEntity<String> response =
            restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

    return response.getBody();
}
public String getNowPlayingMovies() {

    String url =
            "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";

    HttpHeaders headers = new HttpHeaders();
    headers.setBearerAuth(accessToken);

    HttpEntity<String> entity = new HttpEntity<>(headers);

    ResponseEntity<String> response =
            restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

    return response.getBody();
}
public String getMovieDetails(Long movieId) {

    String url =
            "https://api.themoviedb.org/3/movie/" + movieId + "?language=en-US";

    HttpHeaders headers = new HttpHeaders();
    headers.setBearerAuth(accessToken);

    HttpEntity<String> entity = new HttpEntity<>(headers);

    ResponseEntity<String> response =
            restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

    return response.getBody();
}
public String getMovieVideos(Long movieId) {
    String url =
            "https://api.themoviedb.org/3/movie/"
            + movieId
            + "/videos?language=en-US";

    HttpHeaders headers = new HttpHeaders();
    headers.setBearerAuth(accessToken);

    HttpEntity<String> entity = new HttpEntity<>(headers);

    ResponseEntity<String> response =
            restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

    return response.getBody();
}
public String searchMovies(String query) {

    String url =
            "https://api.themoviedb.org/3/search/movie?query="
            + query
            + "&language=en-US&page=1";

    HttpHeaders headers = new HttpHeaders();
    headers.setBearerAuth(accessToken);

    HttpEntity<String> entity = new HttpEntity<>(headers);

    ResponseEntity<String> response =
            restTemplate.exchange(
                    url,
                    HttpMethod.GET,
                    entity,
                    String.class
            );

    return response.getBody();
}
}