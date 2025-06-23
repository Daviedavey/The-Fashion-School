package com.thefashionschool.theFashionSchool.controller;

import com.thefashionschool.theFashionSchool.dto.BlogPostDTO;
import com.thefashionschool.theFashionSchool.model.BlogPost;
import com.thefashionschool.theFashionSchool.security.JwtUtils;
import com.thefashionschool.theFashionSchool.service.BlogPostService;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
public class BlogController {

    @Autowired  // Ensure this is present
    private JwtUtils jwtUtils;

    @Autowired
    private BlogPostService blogPostService;

    private JwtUtils JwtUtils;
    private static final Logger logger = LoggerFactory.getLogger(BlogController.class);


    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BlogPost> createPost(
            @RequestPart("text") String text,
            @RequestPart("image") MultipartFile image,
            @RequestHeader("Authorization") String authHeader) {

        logger.info("Auth Header: {}", authHeader);
        logger.info("File received: {} ({} bytes)",
                image.getOriginalFilename(),
                image.getSize());

        try {
            // Extract token from header
            String token = authHeader.substring(7); // Remove "Bearer "
            String username = jwtUtils.getUserNameFromJwtToken(token);

            // Process upload
            BlogPost post = blogPostService.createPost(username, text, image);
            return ResponseEntity.ok(post);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<BlogPostDTO>> getAllPosts() {
        return ResponseEntity.ok(blogPostService.getAllPosts());
    }



}