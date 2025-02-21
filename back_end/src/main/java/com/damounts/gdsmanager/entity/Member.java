package com.damounts.gdsmanager.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "tbl_Members")
public class Member {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long memberId;

  private String memberUsername;

  private int memberPin;

  @Enumerated(EnumType.STRING)
  private GenderEnum memberGender;
  enum GenderEnum {
    Male, Female
  }

  private int cardId;

  private LocalDate memberStartdate;
  private LocalDate memberEnddate;

  private int memberVirtualnumber;

  private String memberSipnumber;

  @Enumerated(EnumType.STRING)
  private CallaccountEnum memberCalloutaccount;
  enum CallaccountEnum {
    Auto, Account1, Account2, Account3, Account4
  }

  private String memberCell;

  private int groupId;

  private String memberEmail;

  private boolean memberEnable;
}
