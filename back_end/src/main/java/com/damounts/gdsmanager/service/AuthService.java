package com.damounts.gdsmanager.service;

import com.damounts.gdsmanager.entity.User;
import com.damounts.gdsmanager.repository.UserRepository;
import com.damounts.gdsmanager.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
  private final UserRepository userRepository;
  private final JwtUtil jwtUtil;
  private final PasswordEncoder passwordEncoder;

  public AuthService(JwtUtil jwtUtil, PasswordEncoder passwordEncoder, UserRepository userRepository) {
    this.userRepository = userRepository;
    this.jwtUtil = jwtUtil;
    this.passwordEncoder = passwordEncoder;
  }

  public String authenticate(String username, String password) {
    User user = userRepository.findByUserName(username);
    System.out.println(passwordEncoder.encode(password));
    if (user != null && passwordEncoder.matches(password, user.getUserPassword())) {
      return jwtUtil.generateToken(user.getUserName());
    }
    else{
      return "Invalid username or password";
    }
  }
}
