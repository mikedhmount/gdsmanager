package com.damounts.gdsmanager.service;

import com.damounts.gdsmanager.entity.Apply;
import com.damounts.gdsmanager.entity.Holiday;
import com.damounts.gdsmanager.repository.HolidayRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HolidayService {

  private final HolidayRepository holidayRepository;
  private final ApplyService applyService;

  public HolidayService(HolidayRepository holidayRepository, ApplyService applyService) {
    this.holidayRepository = holidayRepository;
    this.applyService = applyService;
  }

  public List<Holiday> findAll() {
    return holidayRepository.findAll();
  }
  public Holiday findById(long id) {
    return holidayRepository.findById(id).orElse(null);
  }
  public Holiday save(Holiday holiday) {
    ResponseEntity<String> response = applyService.commitHoliday(holiday);
    System.out.println(response.getBody());
    return holidayRepository.save(holiday);
  }
  public Holiday update(Holiday holiday) {
    return holidayRepository.save(holiday);
  }
  public ResponseEntity<String> delete(long id) {
    holidayRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }

}
