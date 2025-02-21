package com.damounts.gdsmanager.service;

import com.damounts.gdsmanager.dto.MemberDTO;
import com.damounts.gdsmanager.entity.Member;
import com.damounts.gdsmanager.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class MemberService {
  @Autowired
  MemberRepository memberRepository;

  public MemberService(MemberRepository memberRepository) {
    this.memberRepository = memberRepository;
  }

  public List<Member> getAllMembers() {
    return memberRepository.findAll();
  }
  public Member getMemberById(long id) {
    return memberRepository.getReferenceById(id);
  }

  public void deleteMemberById(long id) {
    memberRepository.deleteById(id);
  }
  public Member addMember(Member member) {
    return memberRepository.save(member);
  }
  public Member updateMember(Member member) {
    return memberRepository.save(member);
  }
  public List<MemberDTO> getAllMembersWithDetails() {
    List<Object[]> results = memberRepository.findAllMembersWithDetails();
    List<MemberDTO> members = new ArrayList<>();

    for (Object[] row : results) {
      members.add(new MemberDTO(
        (Integer) row[0], (String) row[1], (Integer) row[2], (Date) row[3],
        (Date) row[4], (Integer) row[5], (String) row[6], (String) row[7],
        (String) row[8], (String) row[9], (String) row[10], (Boolean) row[11],
        (String) row[12], (Boolean) row[13], (Integer) row[14], (String) row[15], (Integer) row[16]
      ));
    }
    return members;
  }


}
