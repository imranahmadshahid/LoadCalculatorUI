import { Injectable } from '@angular/core';
import {LoanDetails} from '../model/loan-details'
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { GlobalConstants } from '../common/global-constants';
import {loanType} from '../model/loan-Types'

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class LoadserviceService {

  constructor(private http: HttpClient) { }

  calculatLoan(amount:number,years:number,loanType:number)
  {
    var url = GlobalConstants.apiURL + "api/v1/calculate";
    var requestJson=JSON.stringify({'Amount': amount,'PaymentYears':years,'LoanType':Number(loanType)});
    return this.http.post<LoanDetails>(url,requestJson,{headers:{'Content-Type': 'application/json'}});
  }

  
  getLoanTypes()
  {
    
    var url = GlobalConstants.apiURL + "api/v1/getloantypes";
    
   var response = this.http.get<Array<loanType>>(url);
  
 // var loanTypes =[{value:-1,text:"--Select Loan Type--"},{value:1,text:"House Loan"}];
  return response;
  }
}
