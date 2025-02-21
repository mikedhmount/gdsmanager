package com.damounts.gdsmanager.repository;

import com.damounts.gdsmanager.dto.MemberDTO;
import com.damounts.gdsmanager.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {


@Query(value = "SELECT m.member_id, m.member_username, m.member_pin, " +
  "m.member_startdate, m.member_enddate, m.member_virtualnumber, " +
  "m.member_sipnumber, m.member_cell, m.member_email, m.member_gender, " +
  "m.member_calloutaccount, m.member_enable, " +
  "c.card_number, c.card_enabled, c.card_id, g.group_name, g.group_id " +
  "FROM tbl_members m " +
  "JOIN tbl_Cards c ON m.card_id = c.card_id " +
  "LEFT JOIN tbl_Groups g ON m.group_id = g.group_id",
  nativeQuery = true)
List<Object[]> findAllMembersWithDetails();

}
