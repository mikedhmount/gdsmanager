package com.damounts.gdsmanager.service;

import com.damounts.gdsmanager.entity.Apply;
import com.damounts.gdsmanager.entity.Reader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class GdsService {

  private final ReaderService readerService;

  public GdsService(ReaderService readerService) {
    this.readerService = readerService;
  }

  @Autowired
  private WebClient.Builder webClientBuilder;


  public String login(long readerId){
    Reader reader = readerService.getReaderById(readerId);
    WebClient webClient = webClientBuilder.baseUrl("https://" + reader.getReaderIp() +
      ":" + reader.getReaderPort() + "/goform").build();
    String response = webClient.get()
      .uri("/login?cmd=login&user=" + reader.getReaderUsername() + "&type=0")
      .retrieve()
      .bodyToMono(String.class)
      .block();

    return response;
  }

  public String Auth(String challenge, long readerId){
    Reader reader = readerService.getReaderById(readerId);
    WebClient webClient = webClientBuilder.baseUrl("https://" + reader.getReaderIp() +
      ":" + reader.getReaderPort() + "/goform").build();
    String response = webClient.get()
      .uri("/login?cmd=login&user=" + reader.getReaderUsername() + "&authcode=" + challenge + "&type=0")
      .retrieve()
      .bodyToMono(String.class)
      .block();

    return response;
  }

  public String addHoliday(Apply apply){
    WebClient webClient = webClientBuilder.baseUrl(apply.getCommand()).build();
    String response = webClient.post()
      .header("Content-Length", "0")//  Important or the device will lock up
      .retrieve()
      .bodyToMono(String.class)
      .block();

    return response;
  }

  public String addSchedule(Apply apply){
    WebClient webClient = webClientBuilder.baseUrl(apply.getCommand()).build();
    String response = webClient.post()
      .header("Content-Length", "0")//  Important or the device will lock up
      .retrieve()
      .bodyToMono(String.class)
      .block();

    return response;
  }

  public String addGroup(Apply apply){
    WebClient webClient = webClientBuilder.baseUrl(apply.getCommand()).build();
    String response = webClient.post()
      .header("Content-Length", "0")
      .retrieve()
      .bodyToMono(String.class)
      .block();

    return response;
  }


}
