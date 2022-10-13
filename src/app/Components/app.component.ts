import { Component, OnInit } from '@angular/core';
import {LoadserviceService} from '../Services/loadservice.service'
import {LoanDetails} from '../model/loan-details'
import { Loanform } from '../form/loanform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
   title = 'LoadCalculatorUI';
   loanDetails: any = {};
   loanTypes:any = [];
   loanModel: Loanform =  new Loanform(100,5,-1);
   loanDetailsInfo:boolean=false;
   formsubmitting:boolean=false;

  constructor(private _loadCalculator:LoadserviceService)
  {
  }

  ngOnInit(): void {
    this.loanTypes = [];
    this.formsubmitting=true;
    this._loadCalculator.getLoanTypes().subscribe((res) => res.forEach(lt=> this.loanTypes.push({value:lt.Key,text:lt.Value})));
    this.formsubmitting=false;
    //this.loanTypes = [{value:-1,text:"--Select Loan Type--"},{value:1,text:"House Loan"}];
  }

  calculateLoan()
  {
 
    this.formsubmitting=true;
    this._loadCalculator.calculatLoan(this.loanModel.amount,this.loanModel.years,this.loanModel.type).subscribe((res) => this.loanDetails = res);
    this.formsubmitting=false;
    this.loanDetailsInfo=true;
  }

  clearFields()
  {
    this.loanModel = new Loanform(100,5,-1);
    this.loanDetailsInfo=false;
  }
}
