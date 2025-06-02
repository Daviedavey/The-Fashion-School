package com.thefashionschool.theFashionSchool.controller;

import com.thefashionschool.theFashionSchool.dto.LoginRequest;
import com.thefashionschool.theFashionSchool.dto.LoginResponse;
import com.thefashionschool.theFashionSchool.security.JwtUtils;
import com.thefashionschool.theFashionSchool.security.UserDetailsImpl;
import com.thefashionschool.theFashionSchool.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.thefashionschool.theFashionSchool.dto.RegisterRequest;
import com.thefashionschool.theFashionSchool.dto.RegisterResponse;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @Autowired
    JwtUtils jwtUtils;


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        RegisterResponse response = authService.registerUser(registerRequest);

        if (!response.isSuccess()) {
            return ResponseEntity
                    .badRequest()
                    .body(response);
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(new LoginResponse(
                jwt,
                userDetails.getUsername(),
                userDetails.getName(),
                userDetails.getSurname(),
                userDetails.getEmail(),
                userDetails.getAuthorities().iterator().next().getAuthority()
        ));
    }
}