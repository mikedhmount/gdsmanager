package com.damounts.gdsmanager.dto;

public class ReaderDto {
  private Long readerId;
  private String readerName;
  private String readerIp;
  private String readerPort;
  private String readerUsername;
  private String readerPassword;
  private String readerSecret;
  private String readerCookies;

  public ReaderDto(Long readerId, String readerName, String readerIp, String readerPort, String readerUsername, String readerPassword, String readerSecret) {
    this.readerId = readerId;
    this.readerName = readerName;
    this.readerIp = readerIp;
    this.readerPort = readerPort;
    this.readerUsername = readerUsername;
    this.readerPassword = readerPassword;
    this.readerSecret = readerSecret;
  }
  public Long getReaderId() {
    return readerId;
  }
  public void setReaderId(Long readerId) {
    this.readerId = readerId;
  }
  public String getReaderName() {
    return readerName;
  }
  public void setReaderName(String readerName) {
    this.readerName = readerName;
  }
  public String getReaderIp() {
    return readerIp;
  }
  public void setReaderIp(String readerIp) {
    this.readerIp = readerIp;
  }
  public String getReaderPort() {
    return readerPort;
  }
  public void setReaderPort(String readerPort) {
    this.readerPort = readerPort;
  }
  public String getReaderUsername() {
    return readerUsername;
  }
  public void setReaderUsername(String readerUsername) {
    this.readerUsername = readerUsername;
  }
  public String getReaderPassword() {
    return readerPassword;
  }
  public void setReaderPassword(String readerPassword) {
    this.readerPassword = readerPassword;
  }
  public String getReaderSecret() {
    return readerSecret;
  }
  public void setReaderSecret(String readerSecret) {
    this.readerSecret = readerSecret;
  }
  public String getReaderCookies() {
    return readerCookies;
  }
  public void setReaderCookies(String readerCookies) {
    this.readerCookies = readerCookies;
  }
}
