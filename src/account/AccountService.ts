import { randomInt } from "crypto";
import { Account } from "./Account";
import { MissingAccountError } from "./MissingAccountError";

export class AccountService {

    constructor() {
    }

    public async createAccount(): Promise<number> {
        const account = await Account.create({amount: 0})
        return account.id;
    }

    public async getAccount(id: number) : Promise<Account | null> {
        const account = await Account.findByPk(id)
        return account;
    }

    public async withdraw(id: string, amount: number) : Promise<Account | null> {
        const account = await Account.findByPk(id);
        if(account) {
            var newAmount = account.amount - amount;
            Account.update({amount: newAmount}, {where: {id: account.id}})
        } else {
            throw new MissingAccountError(`Account ${id} does not exist`);
        }
        
        return await Account.findByPk(id);
    }

    public async deposit(id: string, amount: number) : Promise<Account | null> {
        let account = await Account.findByPk(id);
        if(account) {
            var newAmount = account.amount + amount;
            Account.update({amount: newAmount}, {where: {id: account.id}})
        } else {
            throw new MissingAccountError(`Account ${id} does not exist`);
        }
        
        return await Account.findByPk(id);
    }

    public async transfer(idFrom: string, idTo: string, amount: number) : Promise<Account | null> {
        //TODO: handle exception and rollback if needed (transaction?)
        const account = this.withdraw(idFrom, amount);
        this.deposit(idTo, amount);
        return account;
    }
}