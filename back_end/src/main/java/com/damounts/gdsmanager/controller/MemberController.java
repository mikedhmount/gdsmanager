package com.damounts.gdsmanager.controller;

import com.damounts.gdsmanager.dto.MemberDTO;
import com.damounts.gdsmanager.entity.Member;
import com.damounts.gdsmanager.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MemberController {

  public final MemberService memberService;
  public MemberController(MemberService memberService) {
    this.memberService = memberService;
  }

  @GetMapping("/api/memberdetails")
  public List<MemberDTO> getAllMembersWithDetails(){
    return memberService.getAllMembersWithDetails();
  }

  @GetMapping("/api/members")
  public List<Member> getAllMembers(){
    return memberService.getAllMembers();
  }

  @PostMapping("/api/member")
  public ResponseEntity<String> createMember(@RequestBody Member member) {
    memberService.addMember(member);
    return ResponseEntity.ok("{\"member\":\"Member created\"}");
  }

  @PutMapping("/api/member")
  public ResponseEntity<String> updateMember(@RequestBody Member member) {
    memberService.updateMember(member);
    return ResponseEntity.ok("{\"member\":\"Member updated\"}");
  }

  @DeleteMapping("/api/member/{memberId}")
  public ResponseEntity<String> deleteMember(@PathVariable Long memberId) {
    memberService.deleteMemberById(memberId);
    return ResponseEntity.ok("{\"member\":\"Member deleted\"}");
  }
}
