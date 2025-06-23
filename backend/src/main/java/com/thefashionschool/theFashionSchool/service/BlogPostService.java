package com.thefashionschool.theFashionSchool.service;

import com.thefashionschool.theFashionSchool.dto.BlogPostDTO;
import com.thefashionschool.theFashionSchool.model.BlogPost;
import com.thefashionschool.theFashionSchool.repository.BlogPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BlogPostService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    private BlogPostRepository blogPostRepository;

    public BlogPost createPost(String username, String text, MultipartFile image) {
        try {
            // Create upload directory if not exists
            Files.createDirectories(Paths.get(uploadDir));

            // Generate unique filename
            String filename = UUID.randomUUID() + "_" + image.getOriginalFilename();
            Path filePath = Paths.get(uploadDir, filename);

            // Save file
            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Create and save blog post
            BlogPost post = new BlogPost();
            post.setUsername(username);
            post.setText(text);
            post.setImagePath(filename);
            post.setCreatedAt(LocalDateTime.now());

            return blogPostRepository.save(post);
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }

    public List<BlogPostDTO> getAllPosts() {
        return blogPostRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(post -> new BlogPostDTO(
                        post.getId(),
                        post.getUsername(),
                        post.getText(),
                        "/uploads/" + post.getImagePath(), // This creates the full URL
                        post.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }
}