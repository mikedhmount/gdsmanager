package com.damounts.gdsmanager.dto;

import lombok.Data;

import java.sql.Date;
import java.time.LocalDate;

@Data
public class MemberDTO {
  private Integer memberId;
  private String memberUsername;
  private Integer memberPin;
  private Date memberStartdate;
  private Date memberEnddate;
  private Integer memberVirtualnumber;
  private String memberSipnumber;
  private String memberCell;
  private String memberEmail;
  private String memberGender;
  private String memberCalloutaccount;
  private Boolean memberEnable;

  private String cardNumber;
  private Boolean cardEnabled;
  private Integer cardId;
  private String groupName;
  private Integer groupId;

  public MemberDTO(Integer memberId, String memberUsername, Integer memberPin, Date memberStartdate,
                   Date memberEnddate, Integer memberVirtualnumber, String memberSipnumber,
                   String memberCell, String memberEmail, String memberGender,
                   String memberCalloutaccount, Boolean memberEnable,
                   String cardNumber, Boolean cardEnabled, Integer cardId, String groupName, Integer groupId) {
    this.memberId = memberId;
    this.memberUsername = memberUsername;
    this.memberPin = memberPin;
    this.memberStartdate = memberStartdate;
    this.memberEnddate = memberEnddate;
    this.memberVirtualnumber = memberVirtualnumber;
    this.memberSipnumber = memberSipnumber;
    this.memberCell = memberCell;
    this.memberEmail = memberEmail;
    this.memberGender = memberGender;
    this.memberCalloutaccount = memberCalloutaccount;
    this.memberEnable = memberEnable;
    this.cardNumber = cardNumber;
    this.cardEnabled = cardEnabled;
    this.cardId = cardId;
    this.groupName = groupName;
    this.groupId = groupId;
  }

}
