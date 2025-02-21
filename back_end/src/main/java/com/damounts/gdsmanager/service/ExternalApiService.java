//package com.damounts.gdsmanager.service;
//import com.damounts.gdsmanager.dto.ReaderDto;
//import com.damounts.gdsmanager.entity.Reader;
//import org.springframework.http.ResponseCookie;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.web.reactive.function.client.WebClient;
//import reactor.core.publisher.Mono;
//
//import java.util.List;
//import java.util.Map;
//import java.util.stream.Collectors;
//
//@Service
//public class ExternalApiService {
//
//  private final WebClient webClient;
//
//  public ExternalApiService(WebClient webClient) {
//    this.webClient = webClient;
//  }
//
//
//  public Mono<String> fetchData(Reader reader) {
//    String readerIp = reader.getReaderIp();
//    String readerPort = reader.getReaderPort();
//    String readerUsername = reader.getReaderUsername();
//    return webClient.get()
//      .uri("https://" + readerIp + ":" + readerPort + "/goform/login?cmd=login&user=" + readerUsername + "&type=0")
//      .retrieve()
//      .bodyToMono(String.class);
//  }
//
//  public Mono<ResponseEntity<String>> fetchLogin(ReaderDto readerDto) {
//
//    String readerIp = readerDto.getReaderIp();
//    String readerPort = readerDto.getReaderPort();
//    String readerUsername = readerDto.getReaderUsername();
//    String authCode = readerDto.getReaderSecret();
//    return webClient.get()
//      .uri("https://" + readerIp + ":" + readerPort + "/goform/login?cmd=login&user=" + readerUsername + "&authcode=" + authCode + "&type=0")
//      .retrieve()
//      .toEntity(String.class) // Retrieve both response body and headers
//      .map(responseEntity -> {
//        Map<String, List<String>> rawCookies = responseEntity.getHeaders();
//
//        // Extract Set-Cookie headers
//        List<String> cookies = rawCookies.entrySet().stream()
//          .filter(entry -> entry.getKey().equalsIgnoreCase("Set-Cookie"))
//          .flatMap(entry -> entry.getValue().stream())
//          .toList();
//
//        System.out.println("Received Cookies: " + cookies);
//        String resp = responseEntity.getBody();
//        String cook = "<Cookies>" + cookies + "</Cookies>";
//        int index = 117;
//        System.out.println(resp.length());
//        StringBuilder builder = new StringBuilder(resp);
//        builder.insert(index, cook);
//        String result = builder.toString();
//
//        return ResponseEntity.ok()
//          .headers(responseEntity.getHeaders()) // Pass all headers, including cookies
//          .body(result);
//      });
//  }
//
//  public Mono<String> fetchGroups(ReaderDto readerDto, Map<String, String> headers) {
//    String readerIp = readerDto.getReaderIp();
//    String readerPort = readerDto.getReaderPort();
//    System.out.println(headers);
//    return webClient.get()
//      .uri("https://" + readerIp + ":" + readerPort + "/goform/config?cmd=get&type=group")
//      .header("Cookie", readerDto.getReaderCookies())
//        .retrieve()
//        .bodyToMono(String.class);
//  }
//}
//
