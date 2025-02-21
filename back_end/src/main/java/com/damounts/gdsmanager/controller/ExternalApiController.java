//package com.damounts.gdsmanager.controller;
//import com.damounts.gdsmanager.dto.ReaderDto;
//import com.damounts.gdsmanager.entity.Reader;
//import com.damounts.gdsmanager.service.ExternalApiService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
////import reactor.core.publisher.Mono;
//
//import java.util.Map;
//
//@RestController
//public class ExternalApiController {
//
//  private final ExternalApiService apiService;
//
//  public ExternalApiController(ExternalApiService apiService) {
//    this.apiService = apiService;
//  }
//
//  @PostMapping("/api/reader/readerAuth")
//  public Mono<String> fetchData(@RequestBody Reader reader) {
//    return apiService.fetchData(reader);
//  }
//  @PostMapping("/api/reader/readerLogin")
//  public Mono<ResponseEntity<String>> fetchLoginData(@RequestBody ReaderDto readerDto) {
//    System.out.println();
//    return apiService.fetchLogin(readerDto);
//  }
////  @PostMapping("/api/reader/readerGroups")
////  public Mono<String> fetchGroups(@RequestBody ReaderDto readerDto, @RequestHeader Map<String, String> headers) {
////    return apiService.fetchGroups(readerDto, headers);
////  }
//}
