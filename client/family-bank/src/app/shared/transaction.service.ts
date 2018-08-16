import { Transaction } from  './transaction.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

class RawTransaction {
    postDate: string;
    amount: number;
}

@Injectable()
export class TransactionService {

    private _transactions: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([]);

    public readonly transactions = this._transactions.asObservable();

    constructor(private httpClient: HttpClient){
    }

    private _sortAndSetBalances(transactions: RawTransaction[]){
        let mappedTransactions = transactions.map((transaction: RawTransaction) => {
            return new Transaction(new Date(transaction.postDate), transaction.amount);
        });
        return mappedTransactions.sort((a: Transaction, b: Transaction) => {
            return a.postDate.getTime() - b.postDate.getTime();
        }).map((transaction: Transaction, index: number, array: Transaction[]) => {
            if(index > 0) {
                transaction.setPreviousBalance(array[index - 1].getBalance());
            }
            return transaction;
        });
    }

    async addTransaction(postDate: Date, amount: number){
        let transactions = await this.httpClient.post<RawTransaction[]>('http://localhost:52000/api/BankTransaction', {postDate: postDate, amount: amount}).toPromise();
        let sortedAndBalancedTransactions = this._sortAndSetBalances(transactions);
        this._transactions.next(sortedAndBalancedTransactions);
    }

    async getTransactions() {
        let transactions = await this.httpClient.get<RawTransaction[]>('http://localhost:52000/api/BankTransaction').toPromise();
        let sortedAndBalancedTransactions = this._sortAndSetBalances(transactions);
        this._transactions.next(sortedAndBalancedTransactions);
        return sortedAndBalancedTransactions;
    }
}