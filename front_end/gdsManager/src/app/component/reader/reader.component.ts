import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReaderService } from '../../service/reader.service';
import { Reader } from '../../interface/reader';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reader',
  imports: [CommonModule, FormsModule],
  templateUrl: './reader.component.html',
  styleUrl: './reader.component.css'
})
export class ReaderComponent implements OnInit{

  currentReader: Reader = {
    readerId: 0,
    readerName: "",
    readerIp: "",
    readerPort: "",
    readerUsername: "",
    readerPassword: ""
  };

  readers: Reader[] = [];

  constructor(private readerService: ReaderService){}

  selectedValue?: String;
  errorLabel:string = "";

  ngOnInit(): void {
    this.getReaders();
  }


  setSelectedValue(){
    console.log(this.selectedValue);
    this.errorLabel = "";
  }

  getReaders(){
    this.readerService.getReaders().subscribe((response) => {
      this.readers = response;
    })
  }
  getReader(readerId: number, readerName: String, readerIp: String, readerPort: String, readerUsername: String, readerPassword: String){
    console.log(readerId);
    this.currentReader.readerId = readerId;
    this.currentReader.readerName = readerName;
    this.currentReader.readerIp = readerIp;
    this.currentReader.readerPort = readerPort;
    this.currentReader.readerUsername = readerUsername;
    this.currentReader.readerPassword = readerPassword
    this.errorLabel = "";
  }
  cancelReader(){
    this.defaultCurrentReader();
    this.errorLabel = "";
  }
  saveReader(){
    //  Check Inputs
    console.log(this.currentReader.readerId);
    if(this.currentReader.readerId == 0){
      //  Save Reader
        this.readerService.saveReader(this.currentReader).subscribe((response) => {
        this.saveSuccess(response);
      }
    )
    }
    else{
      this.readerService.updateReader(this.currentReader).subscribe((response) => {
        this.updateSuccess(response);
      })
    }
  }
  saveSuccess(response: any){
    this.getReaders();
    console.log(response);
    this.errorLabel = response.readerName + " added successfully!";
    this.defaultCurrentReader();
  }
  updateSuccess(response:any){
    this.getReaders();
    console.log(response);
    this.errorLabel = response.readerName + " updated successfully!";
    this.defaultCurrentReader();
  }

  deleteReader(){
    if(this.currentReader.readerId != 0){
      //  Delete reader
      this.readerService.deleteReader(this.currentReader.readerId).subscribe((response) => {
        this.deleteSuccess(this.currentReader.readerName);
      })
    }
    else{
      this.errorLabel = "No Reader to delete";
    }
  }
  deleteSuccess(reader: String){
    this.getReaders();
    this.errorLabel = reader + " deleted successfully!";
    this.defaultCurrentReader();
  }



  defaultCurrentReader(){
    this.currentReader.readerId = 0;
    this.currentReader.readerName = "";
    this.currentReader.readerIp = "";
    this.currentReader.readerPort = "";
    this.currentReader.readerUsername = "";
    this.currentReader.readerPassword = "";
  }


  
}
