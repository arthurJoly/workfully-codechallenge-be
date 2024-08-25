import { AccountService } from "../account/AccountService";

describe('Account Service Test', () => {
    it('Create account', () => {
        var accountService = new AccountService();
        var accountId = accountService.createAccount();
        var retrievedAccount = accountService.getAccount(accountId)
        expect(retrievedAccount?.amount).toBe(0);
        expect(retrievedAccount?.owner).toBe("test");
    });

   
});
