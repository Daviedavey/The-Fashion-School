package com.thefashionschool.theFashionSchool.dto;

import lombok.Data;

@Data
public class LoginResponse {
    private String token;
    private String username;
    private String name;
    private String surname;
    private String email;
    private String role;

    public LoginResponse(String token, String username, String name,
                         String surname, String email, String role) {
        this.token = token;
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
    }
}