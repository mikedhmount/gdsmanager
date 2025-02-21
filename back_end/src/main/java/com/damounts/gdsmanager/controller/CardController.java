package com.damounts.gdsmanager.controller;

import com.damounts.gdsmanager.entity.Card;
import com.damounts.gdsmanager.service.CardService;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CardController {
  private final CardService cardService;
  public CardController(CardService cardService) {
    this.cardService = cardService;
  }

  @GetMapping("/api/cards")
  public List<Card> getCards() {
    return cardService.getAllCards();
  }

  @GetMapping("/api/card/{cardId}")
  public Card getCardById(@PathVariable("cardId") long cardId) {
    return cardService.getCardById(cardId);
  }

  @GetMapping("/api/cards/unused")
  public List<Card> getUnusedCards() {
    return cardService.getUnusedCards();
  }

  @PutMapping("/api/card")
  public ResponseEntity<String> updateCard(@RequestBody Card card) {
    cardService.updateCard(card);
    return ResponseEntity.ok("{\"message\":\"Card updated successfully\"}");
  }
  @DeleteMapping("/api/card/{cardId}")
  public ResponseEntity<String> deleteCard(@PathVariable("cardId") long cardId) {
    cardService.deleteCard(cardId);
    return ResponseEntity.ok("{\"message\":\"Card deleted successfully\"}");
  }

  @PostMapping("/api/card")
  public ResponseEntity<String> addCard(@RequestBody Card card) {
    cardService.createCard(card);
    return ResponseEntity.ok("{\"message\":\"Card created successfully\"}");
  }

  @PostMapping("/api/cards")
  public ResponseEntity<String> addCards(@RequestBody List<Card> cards) {
    try{
      cardService.createCards(cards);
      return ResponseEntity.ok("{\"message\":\"Cards created successfully\"}");
    }
    catch (DataIntegrityViolationException e) {
      return ResponseEntity.ok("{\"message\":\"Duplicate cards in database! Check your file for cards in the list.\"}");
    }

  }

}
