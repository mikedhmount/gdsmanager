package com.damounts.gdsmanager.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@Table(name = "tbl_Holidays")
public class Holiday {

  @Id
//  @GeneratedValue(strategy = GenerationType.AUTO)
  private long holidayId;
  private String holidayName;
  private LocalDate holidayStart;
  private LocalDate holidayEnd;
}
