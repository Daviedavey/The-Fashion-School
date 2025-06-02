package com.thefashionschool.theFashionSchool.security;

import com.thefashionschool.theFashionSchool.model.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserDetailsImpl implements UserDetails {
    private final String username;  // Required by UserDetails
    private final String password;  // Required by UserDetails
    private final String name;
    private final String surname;
    private final String email;
    private final Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(String username, String password, String name,
                           String surname, String email,
                           Collection<? extends GrantedAuthority> authorities) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.authorities = authorities;
    }

    public static UserDetailsImpl build(User user) {
        return new UserDetailsImpl(
                user.getUsername(),  // Must match your User entity's username field
                user.getPassword(),
                user.getName(),
                user.getSurname(),
                user.getEmail(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")) // Default role
        );
    }

    // ============== REQUIRED UserDetails METHODS ==============
    @Override
    public String getUsername() {
        return username;  // MUST IMPLEMENT
    }

    @Override
    public String getPassword() {
        return password;  // MUST IMPLEMENT
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;  // MUST IMPLEMENT
    }

    // ============== ACCOUNT STATUS METHODS ==============
    @Override
    public boolean isAccountNonExpired() {
        return true;  // Modify if you need account expiration
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;  // Modify if you lock accounts
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // Modify if credentials expire
    }

    @Override
    public boolean isEnabled() {
        return true;  // Modify if you disable accounts
    }

    // ============== CUSTOM GETTERS ==============
    public String getName() {
        return name;
    }

    public String getSurname() {
        return surname;
    }


    public String getEmail() {
        return email;
    }
}