package com.damounts.gdsmanager.service;

import com.damounts.gdsmanager.entity.Schedule;
import com.damounts.gdsmanager.repository.ScheduleRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {

  private final ScheduleRepository scheduleRepository;
  private final ApplyService applyService;
  public ScheduleService(ScheduleRepository scheduleRepository, ApplyService applyService) {
    this.scheduleRepository = scheduleRepository;
    this.applyService = applyService;
  }

  public List<Schedule> getAllSchedules() {
    return scheduleRepository.findAll();
  }
  public Schedule getScheduleById(Long id) {
    return scheduleRepository.findById(id).orElse(null);
  }
  public Schedule saveSchedule(Schedule schedule) {
    return scheduleRepository.save(schedule);
  }
  public Schedule updateSchedule(Schedule schedule) {
    ResponseEntity<String> response = applyService.commitSchedule(schedule);
    System.out.println(response.getBody());
    return scheduleRepository.save(schedule);
  }
  public void deleteSchedule(Long id) {
    scheduleRepository.deleteById(id);
  }

}
