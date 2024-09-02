import request from "supertest";
import app from "../app/main"

describe('Account Integration Test', () => {
    it('should respond 200 when creating account', async () => {
        const response = await request(app.express).post("/account");
        expect(response.status).toBe(200);
    });

    it('should respond 200 when deposit', async () => {
        const response = await request(app.express).post("/account")
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number)
            })
        );
        const accountId = response.body.id;
        const responseDeposit = await request(app.express).put("/account/deposit").send({id: Number(accountId), amount: 500})
        expect(responseDeposit.status).toBe(200);
    });

    it('should respond 200 when deposit and withdraw', async () => {
        const response = await request(app.express).post("/account")
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number)
            })
        );
        const accountId = response.body.id;
        const responseDeposit = await request(app.express).put("/account/deposit").send({id: Number(accountId), amount: 500})
        expect(responseDeposit.status).toBe(200);
        const responseWithdraw = await request(app.express).put("/account/withdraw").send({id: Number(accountId), amount: 400})
        expect(responseWithdraw.status).toBe(200);
    });

    it('should respond 500 when withdraw negative amount', async () => {
        const response = await request(app.express).post("/account")
        expect(response.status).toBe(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number)
            })
        );
        const accountId = response.body.id;
        const responseWithdraw = await request(app.express).put("/account/withdraw").send({id: Number(accountId), amount: 400})
        expect(responseWithdraw.status).toBe(400);
    });

    it('should respond 200 when transfer', async () => {
        
        const responseAccount1 = await request(app.express).post("/account")
        expect(responseAccount1.status).toBe(200);

        const responseAccount2 = await request(app.express).post("/account")
        expect(responseAccount2.status).toBe(200);
        
        const accountId1 = responseAccount1.body.id;
        const accountId2 = responseAccount2.body.id;

        const responseDeposit = await request(app.express).put("/account/deposit").send({id: Number(accountId1), amount: 500})
        expect(responseDeposit.status).toBe(200);
        const responseWithdraw = await request(app.express).put("/account/transfer").send({idFrom: Number(accountId1), idTo: Number(accountId2), amount: 400})
        expect(responseWithdraw.status).toBe(200);
    });
});

afterAll(done => {
    app.stop();
    done();
})