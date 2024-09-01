import { randomInt } from "crypto";
import { Account } from "./Account";
import { MissingAccountError } from "./MissingAccountError";
import { ValidationError } from "sequelize";

export class AccountService {

    constructor() {
    }

    public async createAccount(): Promise<number> {
        const account = await Account.create({amount: 0});
        return account.id;
    }

    public async getAccount(id: number) : Promise<Account | null> {
        const account = await Account.findByPk(id);
        return account;
    }

    public async withdraw(id: number, amount: number) : Promise<Account | null> {
        const account = await Account.findByPk(id);
        if(account) {
            var newAmount = account.amount - amount;
            try {
                await Account.update({amount: newAmount}, {where: {id: account.id}});
            } catch (e) {
                throw e;
            } 
        } else {
            throw new MissingAccountError(`Account ${id} does not exist`);
        }
        
        return await Account.findByPk(id);
    }

    public async deposit(id: number, amount: number) : Promise<Account | null> {
        let account = await Account.findByPk(id);
        if(account) {
            var newAmount = account.amount + amount;
            try {
                await Account.update({amount: newAmount}, {where: {id: account.id}});
            } catch (e) {
                throw e;
            }
        } else {
            throw new MissingAccountError(`Account ${id} does not exist`);
        }
        
        return await Account.findByPk(id);
    }

    public async transfer(idFrom: number, idTo: number, amount: number) : Promise<Account | null> {
        try {
            await this.withdraw(idFrom, amount);
            await this.deposit(idTo, amount);
            return await Account.findByPk(idFrom);
        } catch(e) {
            throw e;
        }
       
    }
}