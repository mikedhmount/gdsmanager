package com.damounts.gdsmanager.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "tbl_Apply")
public class Apply {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  private Long readerId;

  private String readerIp;

  private String readerPort;

  private String command;

  private int commandType;
}
