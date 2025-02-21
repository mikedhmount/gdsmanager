package com.damounts.gdsmanager.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "tbl_Groups")
public class Group {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long groupId;
  private String groupName;
  private Long schedId;
}
