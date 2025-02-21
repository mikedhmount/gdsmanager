package com.damounts.gdsmanager.service;

import com.damounts.gdsmanager.entity.User;
import com.damounts.gdsmanager.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
    this.userRepository = userRepository;
    this.passwordEncoder = passwordEncoder;
  }

  public Optional<User> findByUsernameAndPassword(String userName, String userPassword){
    return userRepository.findByUserNameAndUserPassword(userName, passwordEncoder.encode(userPassword));
  }

  public User save(User user) {
    user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
    return userRepository.save(user);
  }

  public List<User> getUser(){
    return userRepository.findAll();
  }

}
