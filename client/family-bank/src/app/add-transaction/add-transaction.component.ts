import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../shared/transaction.service'
import { Transaction } from '../shared/transaction.model';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.css']
})
export class AddTransactionComponent implements OnInit {

  public date: Date;
  public amount: number;

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {
  }

  onAddTransaction(){
    if(!this.date){
      console.log("Invalid date")
      return
    }
    if(!this.amount){
      console.log("Invalid amount")
      return
    }
    this.transactionService.addTransaction(this.date, this.amount);
  }

}
