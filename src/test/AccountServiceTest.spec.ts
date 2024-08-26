import { AccountService } from "../account/AccountService";
import app from "../app/main"

describe('Account Service Test', () => {
    it('Create account', async () => {
        var accountService = new AccountService();
        var accountId = await accountService.createAccount();
        var retrievedAccount = await accountService.getAccount(accountId)
        expect(retrievedAccount?.amount).toBe(0);
    });   
});

afterAll(done => {
    app.stop();
    done();
})
