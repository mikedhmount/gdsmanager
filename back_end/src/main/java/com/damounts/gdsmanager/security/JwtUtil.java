package com.damounts.gdsmanager.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

  private final Key secretKey = Keys.hmacShaKeyFor("h8Ujdu7dguGuud579KioHdoih8909HI8Y8hjsld8762nhkyy7syjKHduayx0Judjsk".getBytes());

  public JwtUtil() {
  }

  public String generateToken(String username) {
    return Jwts.builder().setSubject(username).setIssuedAt(new Date()).setExpiration(new Date(System.currentTimeMillis() + 3600000L)).signWith(this.secretKey, SignatureAlgorithm.HS256).compact();
  }

  public String extractUsername(String token) {
    return ((Claims)Jwts.parserBuilder().setSigningKey(this.secretKey).build().parseClaimsJws(token).getBody()).getSubject();
  }

  public String extractRole(String token) {
    return (String)((Claims)Jwts.parserBuilder().setSigningKey(this.secretKey).build().parseClaimsJws(token).getBody()).get("role");
  }

  public int extractCompanyId(String token) {
    return (Integer)((Claims)Jwts.parserBuilder().setSigningKey(this.secretKey).build().parseClaimsJws(token).getBody()).get("companyId");
  }

  public String extractJwtToken(HttpServletRequest request) {
    String headerAuth = request.getHeader("Authorization");
    return StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ") ? headerAuth.substring(7) : null;
  }

  public boolean isTokenValid(String token, String username) {
    return username.equals(this.extractUsername(token)) && !this.isTokenExpired(token);
  }

  private boolean isTokenExpired(String token) {
    return ((Claims)Jwts.parserBuilder().setSigningKey(this.secretKey).build().parseClaimsJws(token).getBody()).getExpiration().before(new Date());
  }
}
