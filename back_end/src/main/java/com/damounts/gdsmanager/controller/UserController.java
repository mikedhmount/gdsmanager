package com.damounts.gdsmanager.controller;

import com.damounts.gdsmanager.entity.User;
import com.damounts.gdsmanager.repository.UserRepository;
import com.damounts.gdsmanager.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class UserController {

  public UserService userService;

  public UserController(UserService userService) {
    this.userService = userService;
  }

  @PostMapping("/api/user")
  public Optional<User> getUser(@RequestBody User user) {
    return userService.findByUsernameAndPassword(user.getUserName(), user.getUserPassword());
  }

  @PutMapping("/api/user")
  public ResponseEntity<String> updateUser(@RequestBody User user) {
    userService.save(user);
    return ResponseEntity.ok("{\"message\":\"User updated successfully\"}");
  }

  @PostMapping("/api/user/insert")
  public User insertUser(@RequestBody User user) {
    return userService.save(user);
  }

  @GetMapping("/api/user")
  public List<User> getUser() {
    return userService.getUser();
  }

}
