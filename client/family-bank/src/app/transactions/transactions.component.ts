import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../shared/transaction.service'
import { Transaction } from '../shared/transaction.model'

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  private transactions: Transaction[];
  constructor(private transactionService: TransactionService) { }

  async ngOnInit() {
    this.transactions = await this.transactionService.getTransactions();

    this.transactionService.transactions.subscribe((transactions) => this.transactions = transactions);
  }

}
