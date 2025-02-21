package com.damounts.gdsmanager.controller;

import com.damounts.gdsmanager.entity.Holiday;
import com.damounts.gdsmanager.service.HolidayService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HolidayController {

  private final HolidayService holidayService;
  public HolidayController(HolidayService holidayService) {
    this.holidayService = holidayService;
  }

  @GetMapping("/api/holidays")
  public List<Holiday> getHolidays() {
    return holidayService.findAll();
  }

  @GetMapping("/api/holiday/{holidayId}")
  public Holiday getHoliday(@PathVariable long holidayId) {
    return holidayService.findById(holidayId);
  }
  @PostMapping("/api/holiday")
  public ResponseEntity<String> createHoliday(@RequestBody Holiday holiday) {
    holidayService.save(holiday);
    return ResponseEntity.ok("{\"message\":\"Holiday created\"}");
  }
  @PutMapping("/api/holiday")
  public ResponseEntity<String> updateHoliday(@RequestBody Holiday holiday) {
    holidayService.save(holiday);
    return ResponseEntity.ok("{\"message\":\"Holiday updated\"}");
  }
  @DeleteMapping("/api/holiday/{holidayId}")
  public ResponseEntity<String> deleteHoliday(@PathVariable long holidayId) {
    holidayService.delete(holidayId);
    return ResponseEntity.ok("{\"message\":\"Deleted holiday\"}");
  }
}
