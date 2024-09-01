import { AccountService } from "../account/AccountService";

describe('Account Service Test', () => {
    it('Create Get account', async () => {
        var accountService = new AccountService();
        var accountId = await accountService.createAccount();
        var retrievedAccount = await accountService.getAccount(accountId)
        expect(retrievedAccount?.amount).toBe(0);
    });   

    it('Deposit and Withdraw account', async () => {
        var accountService = new AccountService();
        var accountId = await accountService.createAccount();
        await accountService.deposit(accountId, 100);
        await accountService.withdraw(accountId, 50);

        var retrievedAccount = await accountService.getAccount(accountId)
        expect(retrievedAccount?.amount).toBe(50);
    }); 
    
    /*it('Withdraw negative account', async () => {
        var accountService = new AccountService();
        var accountId = await accountService.createAccount();
        expect(() => accountService.withdraw(accountId, 50)).toThrow()
    }); */

    it('Transfer account', async () => {
        var accountService = new AccountService();
        var accountId1 = await accountService.createAccount();
        var accountId2 = await accountService.createAccount();
        await accountService.deposit(accountId1, 100);
        await accountService.transfer(accountId1, accountId2, 50);

        var retrievedAccount = await accountService.getAccount(accountId1)
        expect(retrievedAccount?.amount).toBe(50);
        var retrievedAccount2 = await accountService.getAccount(accountId2)
        expect(retrievedAccount2?.amount).toBe(50);
    }); 
});
