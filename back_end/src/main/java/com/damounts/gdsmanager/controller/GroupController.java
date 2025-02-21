package com.damounts.gdsmanager.controller;

import com.damounts.gdsmanager.dto.GroupDto;
import com.damounts.gdsmanager.dto.GroupScheduleDto;
import com.damounts.gdsmanager.entity.Group;
import com.damounts.gdsmanager.service.GroupService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class GroupController {

  public GroupService groupService;
  public GroupController(GroupService groupService) {
    this.groupService = groupService;
  }

  @GetMapping("/api/groups")
  public List<GroupDto> getAllGroups() {
    return groupService.getAllGroups();
  }

  @PostMapping("/api/group")
  public Group createGroup(@RequestBody Group group) {
    return groupService.createGroup(group);
  }

  @PutMapping("/api/group")
  public Group updateGroup(@RequestBody Group group) {
    return groupService.updateGroup(group);
  }

  @DeleteMapping("/api/group/{groupId}")
  public ResponseEntity<String> deleteGroup(@PathVariable long groupId) {
    groupService.deleteGroup(groupId);
    return ResponseEntity.ok().body("{\"message\":\"Group deleted successfully\"}");
  }
  @GetMapping("/api/group/{groupId}")
  public Optional<Group> getGroup(@PathVariable long groupId) {
    return groupService.getGroupById(groupId);
  }

  @GetMapping("/api/groupSchedule")
  public List<GroupScheduleDto> getGroupSchedule() {
    return groupService.getAllGroupSchedules();
  }
}
