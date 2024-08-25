export class Account {

    id: string;
    owner: string;
    public amount: number;

    constructor(id: string, owner: string, amount: number) {
        this.id = id;
        this.owner = owner;
        this.amount = amount;
    }
}