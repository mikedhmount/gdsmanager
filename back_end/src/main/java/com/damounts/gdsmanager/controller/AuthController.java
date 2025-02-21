package com.damounts.gdsmanager.controller;

import com.damounts.gdsmanager.entity.User;
import com.damounts.gdsmanager.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
  private final AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestParam String userName, @RequestParam String userPassword) {
  public ResponseEntity<?> login(@RequestBody User user ) {
//    System.out.println(loginRequestDTO);
    String token = authService.authenticate(user.getUserName(), user.getUserPassword());
    if(token.isEmpty()){
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.ok().body("{\"token\":\"" + token + "\", \"userName\":\"" +
      user.getUserName() + "\"}");
  }
}

