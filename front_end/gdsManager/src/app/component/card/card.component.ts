import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardService } from '../../service/card.service';
import { Card } from '../../interface/card';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-card',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit{

  constructor(private cardService: CardService, private papa: Papa){}

  errorLabel: String = "";

  currentCard: Card = {
    cardId: 0,
    cardNumber: "",
    cardEnabled: false
  }

  cards: Card[] =[];
  csvData: any[] = [];
  csvCards: Card[] = [];
  uploadFileName = "";

  ngOnInit(): void {
      this.getCards();
  }

  getCards(){
    this.cardService.getCards().subscribe((response) => {
      this.cards = response;
    })
  }
  getCard(cardId: number, cardNumber: string, cardEnabled: boolean){
    this.currentCard.cardId = cardId;
    this.currentCard.cardNumber = cardNumber;
    this.currentCard.cardEnabled = cardEnabled;
  }
  saveCard(){
    if(this.currentCard.cardNumber == "" && this.csvData.length == 0){
      this.errorLabel = "You must either enter a card number or choose a file to upload to save cards!";
      return;
    }
    if( this.currentCard.cardNumber != ""){
    this.cardService.saveCard(this.currentCard).subscribe((response) => {
      this.errorLabel = response.message;
    })}
    else {
      this.csvData.forEach(element => {
        let newCard:Card = {
          cardNumber: element[0]
        }
        
        // console.log(newCard);
        this.csvCards.push(newCard);
        // console.log(this.csvCards);
      });
      // console.log(this.csvCards);
      this.cardService.saveCards(this.csvCards).subscribe((response) => {
        this.csvCards = [];
        this.errorLabel = response.message;
      })
    }
  }
  deleteCard(){
    if(this.currentCard.cardId == 0){
      this.errorLabel = "You must choose a card to delete!";
      return;
    }
    if(this.currentCard.cardEnabled == true){
      this.errorLabel = "A member is enabled and issued this card. You must disable or delete the member first!";
      return;
    }
    this.cardService.deleteCard(this.currentCard.cardId!).subscribe((response) => {
      this.getCards();
      this.cleanup();
      this.errorLabel = response.message;
    })
  }
  cancelCard(){
    this.cleanup();
    this.errorLabel = "";
  }

  cleanup(){
    this.currentCard.cardId = 0;
    this.currentCard.cardNumber = "";
    this.currentCard.cardEnabled = false;
    this.uploadFileName = "";
  }

  uploadFile(event: any){
    const file = event.target.files[0];
    this.uploadFileName = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const csv = reader.result as string;
          this.papa.parse(csv, {
            header: false,
            skipEmptyLines: true,
            complete: (result) => {
              this.csvData = result.data;
              // console.log(this.csvData);
            },
            error: (error) => {
              console.error('Error parsing CSV:', error);
            }
          });
        };
        reader.readAsText(file);
  }


}
