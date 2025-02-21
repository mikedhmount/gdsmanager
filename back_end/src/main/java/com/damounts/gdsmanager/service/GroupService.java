package com.damounts.gdsmanager.service;

import com.damounts.gdsmanager.dto.GroupDto;
import com.damounts.gdsmanager.dto.GroupScheduleDto;
import com.damounts.gdsmanager.entity.Group;
import com.damounts.gdsmanager.repository.GroupRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GroupService {

  private final GroupRepository groupRepository;
  private final ApplyService applyService;
  public GroupService(GroupRepository groupRepository, ApplyService applyService) {
    this.groupRepository = groupRepository;
    this.applyService = applyService;
  }

  public List<GroupDto> getAllGroups() {
    List<Object[]> allGroups = groupRepository.getAllGroups();
    return allGroups.stream()
      .map(obj -> new GroupDto(
        ((Integer) obj[0]).longValue(),
        (String) obj[1],
        ((Integer) obj[2]).longValue(),
        (String) obj[3]))
      .collect(Collectors.toList());

  }
  public Optional<Group> getGroupById(Long id) {
    return groupRepository.findById(id);
  }
  public Group createGroup(Group group) {
    group.setGroupId(null);
    Group savedGroup = groupRepository.save(group);
    ResponseEntity<String> response = applyService.commitGroup(savedGroup);
    System.out.println(response.getBody());
    return savedGroup;
  }

  public Group updateGroup(Group group) {
    ResponseEntity<String> response = applyService.commitGroup(group);
    System.out.println(response.getBody());
      return groupRepository.save(group);
  }
  public void deleteGroup(Long id) {
    groupRepository.deleteById(id);
  }

  public List<GroupScheduleDto> getAllGroupSchedules() {
    return groupRepository.getAllSchedules();
  }

}
