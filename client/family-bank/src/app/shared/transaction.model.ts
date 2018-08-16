export class Transaction {
    public postDate: Date;
    public amount: number;
    private _previousBalance: number = 0;

    constructor(postDate: Date, amount: number) {
        this.postDate = postDate;
        this.amount = amount;
    } 

    getBalance(){
        return this._previousBalance + this.amount;
    }

    setPreviousBalance(balance: number){
        this._previousBalance = balance;
    }
}