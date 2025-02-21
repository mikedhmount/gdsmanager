import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Card } from '../interface/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  getUnusedCards():Observable<any>{
    return this.http.get("http://localhost:8080/api/cards/unused");
  }
  getCards():Observable<any>{
    return this.http.get("http://localhost:8080/api/cards");
  }

  getCard(cardId: number):Observable<any>{
    return this.http.get(`http://localhost:8080/api/card/${cardId}`);
  }

  saveCard(card: Card):Observable<any>{
    return this.http.post("http://localhost:8080/api/card", card);
  }

  saveCards(cards: Card[]):Observable<any>{
    return this.http.post("http://localhost:8080/api/cards", cards);
  }

  updateCard(cardId:Card):Observable<any>{
    return this.http.put(`http://localhost:8080/api/card`, cardId);
  }

  deleteCard(cardId: number):Observable<any>{
    return this.http.delete(`http://localhost:8080/api/card/${cardId}`);
  }
}
