package com.damounts.gdsmanager.service;

import com.damounts.gdsmanager.entity.Card;
import com.damounts.gdsmanager.repository.CardRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CardService {

  private final CardRepository cardRepository;

  public CardService(CardRepository cardRepository) {
    this.cardRepository = cardRepository;
  }

  public List<Card> getUnusedCards() {
    return cardRepository.findByCardEnabledFalse();
  }
  public List<Card> getAllCards() {
    return cardRepository.findAll();
  }
  public Card getCardById(Long id) {
    return cardRepository.findById(id).orElse(null);
  }
  public Card createCard(Card card) {
    return cardRepository.save(card);
  }
  public Card updateCard(Card card) {
    return cardRepository.save(card);
  }
  public void deleteCard(Long id) {
    cardRepository.deleteById(id);
  }
  public List<Card> createCards(List<Card> cards) {
    return cardRepository.saveAll(cards);
  }
}
