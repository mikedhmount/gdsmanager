package com.damounts.gdsmanager.dto;

public class GroupDto {

  private Long groupId;
  private String groupName;
  private Long schedId;
  private String schedName;

  public GroupDto(Long groupId, String groupName, Long schedId, String schedName) {
    this.groupId = groupId;
    this.groupName = groupName;
    this.schedId = schedId;
    this.schedName = schedName;
  }
  public Long getGroupId() {
    return groupId;
  }
  public void setGroupId(Long groupId) {
    this.groupId = groupId;
  }
  public String getGroupName() {
    return groupName;
  }
  public void setGroupName(String groupName) {
    this.groupName = groupName;
  }
  public Long getSchedId() {
    return schedId;
  }
  public void setSchedId(Long schedId) {
    this.schedId = schedId;
  }
  public String getSchedName() {
    return schedName;
  }
  public void setSchedName(String schedName) {
    this.schedName = schedName;
  }

}
