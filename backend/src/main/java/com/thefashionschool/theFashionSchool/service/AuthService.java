 package com.thefashionschool.theFashionSchool.service;

import com.thefashionschool.theFashionSchool.dto.RegisterRequest;
import com.thefashionschool.theFashionSchool.dto.RegisterResponse;
import com.thefashionschool.theFashionSchool.model.User;
import com.thefashionschool.theFashionSchool.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public RegisterResponse registerUser(RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            return new RegisterResponse("Username is already taken!", false);
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return new RegisterResponse("Email is already in use!", false);
        }

        // Create new user account
        User user = new User();
        user.setUsername(registerRequest.getUsername().toLowerCase());
        user.setName(registerRequest.getName().toLowerCase());
        user.setSurname(registerRequest.getSurname().toLowerCase());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setRole("STUDENT"); // Default role

        userRepository.save(user);

        return new RegisterResponse("User registered successfully!", true);
    }
}