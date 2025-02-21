package com.damounts.gdsmanager.dto;

public class GroupScheduleDto {
  private Long scheduleId;
  private String scheduleName;

  public GroupScheduleDto(Long scheduleId, String scheduleName) {
    this.scheduleId = scheduleId;
    this.scheduleName = scheduleName;
  }
  public Long getScheduleId() {
    return scheduleId;
  }
  public void setScheduleId(Long scheduleId) {
    this.scheduleId = scheduleId;
  }
  public String getScheduleName() {
    return scheduleName;
  }
  public void setScheduleName(String scheduleName) {
    this.scheduleName = scheduleName;
  }
}
