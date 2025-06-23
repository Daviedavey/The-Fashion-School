package com.thefashionschool.theFashionSchool.dto;

import java.time.LocalDateTime;


public class BlogPostDTO {
    private Long id;
    private String username;
    private String text;
    private String imageUrl;
    private LocalDateTime createdAt;

    // Constructors, getters, and setters
    public BlogPostDTO() {}

    public BlogPostDTO(Long id, String username, String text, String imageUrl, LocalDateTime createdAt) {
        this.id = id;
        this.username = username;
        this.text = text;
        this.imageUrl = imageUrl;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}