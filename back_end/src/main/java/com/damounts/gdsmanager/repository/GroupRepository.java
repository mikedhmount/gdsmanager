package com.damounts.gdsmanager.repository;

import com.damounts.gdsmanager.dto.GroupDto;
import com.damounts.gdsmanager.dto.GroupScheduleDto;
import com.damounts.gdsmanager.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

  @Query(value = "SELECT g.group_id, g.group_name, g.sched_id, s.schedule_name " +
    "FROM tbl_Groups g " +
    "JOIN tbl_Schedules s ON g.sched_id = s.schedule_id", nativeQuery = true)
//  List<GroupDto> getAllGroups();
  List<Object[]> getAllGroups();

//  @Query(value = "SELECT schedule_id, schedule_name from tbl_Schedules", nativeQuery = true)
  @Query("Select new com.damounts.gdsmanager.dto.GroupScheduleDto(s.scheduleId, s.scheduleName) From Schedule s")
  List<GroupScheduleDto> getAllSchedules();
}
