package com.damounts.gdsmanager.webclient;

import io.netty.handler.ssl.SslContext;
import io.netty.handler.ssl.SslContextBuilder;
import io.netty.handler.ssl.util.InsecureTrustManagerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ExchangeFilterFunction;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;
import reactor.netty.tcp.SslProvider;
import reactor.netty.tcp.TcpClient;
import reactor.netty.transport.ProxyProvider;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLException;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Configuration
public class WebClientConfig {

  private final Map<String, String> cookieJar = new ConcurrentHashMap<>();

  @Bean
  public WebClient.Builder webClientBuilder() throws NoSuchAlgorithmException, SSLException {
    // Create a trust manager that does not validate certificate chains
    TrustManager[] trustAllCertificates = new TrustManager[]{
      new X509TrustManager() {
        public X509Certificate[] getAcceptedIssuers() {
          return null;
        }

        public void checkClientTrusted(X509Certificate[] certs, String authType) {
        }

        public void checkServerTrusted(X509Certificate[] certs, String authType) {
        }
      }
    };


    // Return WebClient.Builder with custom connector
    return WebClient.builder()
      .clientConnector(new ReactorClientHttpConnector(
        HttpClient.create().secure(t -> {
          try {
            t.sslContext(SslContextBuilder.forClient().trustManager(InsecureTrustManagerFactory.INSTANCE).build());
          } catch (SSLException e) {
            throw new RuntimeException(e);
          }
        }).responseTimeout(Duration.ofSeconds(30)))).filter(logCookies())
      .filter(addStoredCookies());
  }




//            Cookies

  private ExchangeFilterFunction logCookies() {
    return ExchangeFilterFunction.ofResponseProcessor(clientResponse -> {
      StringBuilder cookieBuilder = new StringBuilder();
      clientResponse.cookies().forEach((name, cookies) -> {
        cookies.forEach(cookie -> {
          if(cookieBuilder.length() > 0) {
            cookieBuilder.append("; ");
          }
          cookieBuilder.append(name).append("=").append(cookie.getValue());

//          cookieJar.put(name, cookie.getValue());
//          System.out.println("Stored Cookie: " + name + "=" + cookie.getValue());
        });
      });
      String combinedCookie = cookieBuilder.toString();
      System.out.println(combinedCookie);
      cookieJar.put("Cookie", combinedCookie);
      return Mono.just(clientResponse);
    });
  }


  private ExchangeFilterFunction addStoredCookies() {
    return ExchangeFilterFunction.ofRequestProcessor(clientRequest -> {
      ClientRequest.Builder newRequest = ClientRequest.from(clientRequest);

      // Add stored cookies
//      cookieJar.forEach(newRequest::cookie);
      String storedCookie = cookieJar.get("Cookie"); // Retrieve stored cookie

      if (storedCookie != null) {
        System.out.println("Adding Cookie Header: " + storedCookie);
        newRequest.header("Cookie",storedCookie); // Set it as the Cookie header
      }


      return Mono.just(newRequest.build());
    });
  }
}
