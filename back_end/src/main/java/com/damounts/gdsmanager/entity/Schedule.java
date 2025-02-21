package com.damounts.gdsmanager.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Data
@Table(name = "tbl_Schedules")
public class Schedule {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private long scheduleId;
  private String scheduleName;
  private LocalTime mondayStart;
  private LocalTime mondayEnd;
  private LocalTime tuesdayStart;
  private LocalTime tuesdayEnd;
  private LocalTime wednesdayStart;
  private LocalTime wednesdayEnd;
  private LocalTime thursdayStart;
  private LocalTime thursdayEnd;
  private LocalTime fridayStart;
  private LocalTime fridayEnd;
  private LocalTime saturdayStart;
  private LocalTime saturdayEnd;
  private LocalTime sundayStart;
  private LocalTime sundayEnd;
  private boolean holidays;

}
