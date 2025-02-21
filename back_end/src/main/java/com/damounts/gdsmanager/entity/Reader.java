package com.damounts.gdsmanager.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "tbl_Readers")
public class Reader {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long readerId;

  private String readerName;

  private String readerIp;

  private String readerPort;

  private String readerUsername;

  private String readerPassword;
}
