package com.thefashionschool.theFashionSchool.security;

import com.thefashionschool.theFashionSchool.model.User;
import com.thefashionschool.theFashionSchool.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        User user = userRepository.findByUsernameOrEmail(usernameOrEmail.toLowerCase(), usernameOrEmail.toLowerCase())
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + usernameOrEmail));

        return UserDetailsImpl.build(user);
    }
}