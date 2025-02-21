package com.damounts.gdsmanager.controller;

import com.damounts.gdsmanager.entity.Reader;
import com.damounts.gdsmanager.repository.ReaderRepository;
import com.damounts.gdsmanager.service.ReaderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class ReaderController {

  private final ReaderService readerService;
  private final PasswordEncoder passwordEncoder;

  public ReaderController(ReaderService readerService, PasswordEncoder passwordEncoder) {
    this.readerService = readerService;
    this.passwordEncoder = passwordEncoder;
  }

  @GetMapping("/api/readers")
  public List<Reader> getAllReaders(){
    System.out.println("api readers");
    return readerService.getAllReaders();
  }

  @GetMapping("/api/reader/{readerId}")
  public Reader getReaderById(@PathVariable("readerId") long readerId){
    return readerService.getReaderById(readerId);
  }

  @PostMapping("/api/reader")
  public Reader createReader(@RequestBody Reader reader) {
    return readerService.saveReader(reader);
  }

  @PutMapping("/api/reader/{readerId}")
  public Reader updateReader(@PathVariable int readerId, @RequestBody Reader reader) {
    return readerService.updateReader(reader);
  }

  @DeleteMapping("/api/reader/{readerId}")
  public ResponseEntity<String> deleteReader(@PathVariable Long readerId) {
    readerService.deleteReader(readerId);
    return ResponseEntity.ok("{\"message\":\"Deleted reader " + readerId + "\"}");
  }
}
