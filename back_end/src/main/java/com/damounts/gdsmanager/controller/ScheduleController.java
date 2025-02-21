package com.damounts.gdsmanager.controller;

import com.damounts.gdsmanager.entity.Schedule;
import com.damounts.gdsmanager.service.ScheduleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ScheduleController {

  private final ScheduleService scheduleService;
  public ScheduleController(ScheduleService scheduleService) {
    this.scheduleService = scheduleService;
  }

  @GetMapping("/api/schedules")
  public List<Schedule> getAllSchedules() {
    return scheduleService.getAllSchedules();
  }

  @GetMapping("/api/schedule/{scheduleId}")
  public Schedule getScheduleById(@PathVariable long scheduleId) {
    return scheduleService.getScheduleById(scheduleId);
  }

//  @PostMapping("/api/schedule")
//  public Schedule createSchedule(@RequestBody Schedule schedule) {
//    return scheduleService.saveSchedule(schedule);
//  }

  @PutMapping("/api/schedule")
  public ResponseEntity<String> updateSchedule(@RequestBody Schedule schedule) {
    scheduleService.updateSchedule(schedule);
      return ResponseEntity.ok("{\"message\":\"Schedule updated successfully\"}");
  }
}
