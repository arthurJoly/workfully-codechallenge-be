import { randomInt } from "crypto";
import { Account } from "./Account";
import { MissingAccountError } from "./MissingAccountError";

export class AccountService {
    private accounts: Map<string, Account>;

    constructor() {
        this.accounts = new Map<string, Account>();
    }

    public createAccount(): string {
        var id = "test" + randomInt(100);
        this.accounts.set(id, new Account(id, "test", 0));
        return id;
    }

    public getAccount(id: string) : Account | undefined {
        return this.accounts.get(id);
    }

    public withdraw(id: string, amount: number) : Account | undefined {
        let account = this.accounts.get(id);
        if(account) {
            var newAmount = account.amount - amount;
            account.amount = newAmount;
            this.accounts.set(account.id, account);
        } else {
            throw new MissingAccountError(`Account ${id} does not exist`);
        }
        
        return this.accounts.get(id);
    }

    public deposit(id: string, amount: number) : Account | undefined {
        let account = this.accounts.get(id);
        if(account) {
            var newAmount = account.amount + amount;
            account.amount = newAmount;
            this.accounts.set(account.id, account);
        } else {
            throw new MissingAccountError(`Account ${id} does not exist`);
        }
        
        return this.accounts.get(id);
    }

    public transfer(idFrom: string, idTo: string, amount: number) : Account | undefined {
        //TODO: handle exception and rollback if needed (transaction?)
        this.withdraw(idFrom, amount);
        this.deposit(idTo, amount);
        return this.accounts.get(idFrom);
    }
}