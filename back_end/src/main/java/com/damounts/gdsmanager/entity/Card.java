package com.damounts.gdsmanager.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="tbl_Cards")
public class Card {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)

  private long cardId;

  private String cardNumber;

  private boolean cardEnabled;

  public long getCardId() {
    return cardId;
  }
  public void setCardId(long cardId) {
    this.cardId = cardId;
  }
  public String getCardNumber() {
    return cardNumber;
  }
  public void setCardNumber(String cardNumber) {
    this.cardNumber = cardNumber;
  }
  public boolean isCardEnabled() {
    return cardEnabled;
  }
  public void setCardEnabled(boolean cardEnabled) {
    this.cardEnabled = cardEnabled;
  }


}
